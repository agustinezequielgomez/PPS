import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Plugins,
  PushNotification,
  PushNotificationActionPerformed
} from '@capacitor/core';
import { AlertController, ToastController } from '@ionic/angular';
import { environment } from '../../../environments/environment';
import { SendNotificationRequest, SendNotificationResponse } from '../Models/Classes/send-notification-request';
import { DataBaseCollections } from '../Models/Enums/data-base-collections.enum';
import { DataStoreService } from './data-store.service';
import { DatabaseService } from './database.service';
import { DBUserDocument } from '../Models/Classes/user';
import { timer } from 'rxjs';


const { PushNotifications } = Plugins;


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toast: ToastController, private alertController: AlertController, private http: HttpClient,
              private dataBase: DatabaseService) { }

  async presentToast(color: 'success' | 'warning' | 'danger', message: string, duration: number = 0,
                     mode: 'ios' | 'md' = 'md', position: 'bottom' | 'middle' | 'top' = 'bottom', header?: string, cssClass?: string) {

    switch (color) {
      case 'success':
        console.log('SUCCESS');
        message = message.concat(' ✔️');
        break;
      case 'warning':
        message = message.concat(' ⚠️');
        break;
      case 'danger':
        message = message.concat(' ❌');
        break;
    }
    const CANCELLATION_BUTTON: string[] | undefined = (duration === 0) ? ['Cancelar'] : undefined;

    const TOAST: HTMLIonToastElement = await this.toast.create({
      animated: true,
      color,
      cssClass,
      message,
      duration,
      mode,
      position,
      header,
      buttons: CANCELLATION_BUTTON,
      translucent: false
    });

    TOAST.present();
  }

  async presentAlert(backdropDismiss: boolean, header: string, keyBoardClose: boolean, message: string, mode: 'ios' | 'md' = 'md',
                     cssClass?: string, buttons?: string[] | [{ text?: string, role?: string, cssClass?: string }] | any,
                     subHeader?: string) {
    const alert = await this.alertController.create({
      backdropDismiss,
      header,
      keyboardClose: keyBoardClose,
      message,
      mode,
      cssClass,
      buttons,
      subHeader
    });

    await alert.present();
  }

  async pushNotificationsInit() {
    if ((await PushNotifications.requestPermission()).granted) {
      PushNotifications.addListener('registration', async (token) => {
        console.log(`USER LOGGED IN ${JSON.stringify(DataStoreService.User.CurrentUser)}`);
        DataStoreService.User.CurrentUser.data.deviceToken = token.value;
        await this.dataBase.saveDocument<DBUserDocument>(DataBaseCollections.users, DataStoreService.User.CurrentUser.UID,
                                                          { user: DataStoreService.User.CurrentUser });
        DataStoreService.Configuration.DeviceToken = token.value;
      });

      PushNotifications.addListener('pushNotificationReceived',
      (notification: PushNotification) => {
        alert('Push received: ' + JSON.stringify(notification));
      }
    );

      PushNotifications.addListener('pushNotificationActionPerformed',
      (notification: PushNotificationActionPerformed) => {
        alert('Push action performed: ' + JSON.stringify(notification));
      }
    );
      await PushNotifications.register();
    }
  }

  async sendPushNotification<T>(request: SendNotificationRequest<T>): Promise<boolean> {
    try {
      const response: SendNotificationResponse = await this.http.post<SendNotificationResponse>
                                                (environment.FCM_URL, request, { headers: {Authorization: `key=${environment.FCM_SERVER_KEY}`, 'Content-Type': 'application/json'}}).toPromise();
      return (response.success === 1) ? true : false;
    } catch (error) {
      console.log(`ERROR: ${error}`);
    }
  }
}
