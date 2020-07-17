import { Injectable } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toast: ToastController, private alertController: AlertController) { }

  async presentToast(color: 'success' | 'warning' | 'error', message: string, duration: number = 0,
                     mode: 'ios' | 'md' = 'md', position: 'bottom' | 'middle' | 'top' = 'bottom', header?: string) {

    switch (color) {
      case 'success':
        message.concat(' ✔️');
        break;
      case 'warning':
        message.concat(' ⚠️');
        break;
      case 'error':
        message.concat(' ❌');
        break;
    }
    const CANCELLATION_BUTTON: string[] | undefined = (duration === 0) ? ['Cancelar'] : undefined;

    const TOAST: HTMLIonToastElement = await this.toast.create({
      animated: true,
      color: color,
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

  async presentAlertRadio() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Prompt!',
      inputs: [
        {
          name: 'name1',
          type: 'text',
          placeholder: 'Placeholder 1'
        },
        {
          name: 'name2',
          type: 'text',
          id: 'name2-id',
          value: 'hello',
          placeholder: 'Placeholder 2'
        },
        // multiline input.
        {
          name: 'paragraph',
          id: 'paragraph',
          type: 'textarea',
          placeholder: 'Placeholder 3'
        },
        {
          name: 'name3',
          value: 'http://ionicframework.com',
          type: 'url',
          placeholder: 'Favorite site ever'
        },
        // input date with min & max
        {
          name: 'name4',
          type: 'date',
          min: '2017-03-01',
          max: '2018-01-12'
        },
        // input date without min nor max
        {
          name: 'name5',
          type: 'date'
        },
        {
          name: 'name6',
          type: 'number',
          min: -5,
          max: 10
        },
        {
          name: 'name7',
          type: 'number'
        },
        {
          name: 'name8',
          type: 'password',
          placeholder: 'Advanced Attributes',
          cssClass: 'specialClass',
          attributes: {
            maxlength: 4,
            inputmode: 'decimal'
          }
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }
}
