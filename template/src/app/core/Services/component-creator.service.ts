import { Injectable } from '@angular/core';
import { ActionSheetController, PickerController, PopoverController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ComponentCreatorService {

  constructor(private actionSheetController: ActionSheetController, private pickerController: PickerController,
              private popOverController: PopoverController) { }

  async createActionSheet(buttons: [{text: string, handler: () => boolean | void | Promise<boolean | void>,
                          icon?: string, role?: string}],
                          mode: 'ios' | 'md', header: string, keyboardClose?: boolean, cssClass?: string,
                          translucent?: boolean, subHeader?: string) {
    const ACTION_SHEET = await this.actionSheetController.create({
      animated: true,
      backdropDismiss: true,
      buttons: buttons,
      mode: mode,
      header: header,
      keyboardClose: keyboardClose,
      translucent: translucent,
      subHeader: subHeader,
      cssClass: cssClass
    });

    await ACTION_SHEET.present();
  }

  async createColumnPicker<T>(confirmHandler: (value: T) => boolean | void, columnObjects: T[], columnName: string,
                              propDisplayName: string, mode: 'ios' | 'md', keyboardClose?: boolean, cssClass?: string) {
    const PICKER = await this.pickerController.create({
      animated: true,
      backdropDismiss: true,
      showBackdrop: true,
      keyboardClose: keyboardClose,
      cssClass: cssClass,
      mode: mode,
      buttons: [
        {
          text: 'Aceptar',
          handler: (value) => {
            confirmHandler(value[columnName].value);
          }
        },
        {
          text: 'Cancelar',
          role: 'Close'
        }
      ],
      columns: [
        {
          name: columnName,
          options: this.getSingleColumnOptions<T>(columnObjects, propDisplayName)
        }
      ]
    });

    await PICKER.present();
  }

  async createPopOver(component: () => any | HTMLElement | null | string, mode: 'ios' | 'md',
                      keyboardClose?: boolean, cssClass?: string, translucent?: boolean) {
    const POPOVER = await this.popOverController.create({
      animated: true,
      backdropDismiss: true,
      component: component,
      cssClass: cssClass,
      keyboardClose: keyboardClose,
      mode: mode,
      showBackdrop: true,
      translucent: translucent
    });


    await POPOVER.present();
  }

  private getSingleColumnOptions<T>(objects: T[], displayProperty: string) {
    const OPTIONS: {text: string, value: T}[] = [];
    for (const column of objects) {
      OPTIONS.push({
        text: column[displayProperty],
        value: column
      });
    }
    return OPTIONS;
  }
}
