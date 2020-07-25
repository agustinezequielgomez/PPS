import { Injectable } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toast: ToastController, private alertController: AlertController) { }

  async presentToast(color: 'success' | 'warning' | 'danger', message: string, duration: number = 0,
                     mode: 'ios' | 'md' = 'md', position: 'bottom' | 'middle' | 'top' = 'bottom', cssClass?: string, header?: string) {

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
      color: color,
      // cssClass: cssClass,
      message: message,
      duration: duration,
      mode: mode,
      position: position,
      header: header,
      buttons: CANCELLATION_BUTTON,
      translucent: true
    });

    TOAST.present();
  }

  async presentAlert(backdropDismiss: boolean, header: string, keyBoardClose: boolean, message: string, mode: 'ios' | 'md' = 'md',
                     cssClass?: string, buttons?: string[] | [{ text?: string, role?: string, cssClass?: string }] | any,
                     subHeader?: string) {
    const alert = await this.alertController.create({
      backdropDismiss: backdropDismiss,
      header: header,
      keyboardClose: keyBoardClose,
      message: message,
      mode: mode,
      cssClass: cssClass,
      buttons: buttons,
      subHeader: subHeader
    });

    await alert.present();
  }
}
