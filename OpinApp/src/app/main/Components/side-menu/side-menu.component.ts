import { Component, OnInit, ViewChild } from '@angular/core';
import { IonMenu, NavController } from '@ionic/angular';
import { SideMenuItem } from 'src/app/core/Models/Classes/side-menu-item';
import { StorageKeys } from 'src/app/core/Models/Enums/storage-keys.enum';
import { DataShareService } from '../../../core/Services/data-share.service';
import { StorageService } from '../../../core/Services/storage.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {

  public menuItem: SideMenuItem;
  @ViewChild('menu') menu: IonMenu;
  constructor(public share: DataShareService, private storage: StorageService, private nav: NavController) {
    this.menuItem = this.share.SideMenuItems[0];
  }

  ngOnInit() {}

  selectItem(item: SideMenuItem) {
    this.menu.close(true);
    this.menuItem = item;
  }

  async logOut() {
    this.menu.close(true);
    this.menuItem = this.share.SideMenuItems[0];
    await this.storage.deleteStorage(StorageKeys.USER);
    this.nav.navigateRoot('', {animationDirection: 'back'});
  }
}
