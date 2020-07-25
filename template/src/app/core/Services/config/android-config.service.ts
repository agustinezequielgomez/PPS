import { Injectable } from '@angular/core';
import { AndroidPermissions as PermissionService } from '@ionic-native/android-permissions/ngx';
import { NavigationBar } from '@ionic-native/navigation-bar/ngx';
import { StatusBar as StatusBarService } from '@ionic-native/status-bar/ngx';
import { AppConfig, StatusBar } from '../../Models/Classes/app-config';
import { StorageKeys } from '../../Models/Enums/storage-keys.enum';
import { DataShareService } from '../data-share.service';
import { IConfigService } from '../Interfaces/iconfig-service';
import { StorageService } from '../storage.service';

@Injectable({
  providedIn: 'root'
})
export class AndroidConfigService implements IConfigService {

  constructor(private storage: StorageService, private statusBarService: StatusBarService, private navBar: NavigationBar,
              private permissions: PermissionService, private dataShare: DataShareService) { }

  async loadAppConfiguration(): Promise<void> {
    try {
      const config = await this.storage.getStorage<AppConfig>(StorageKeys.CONFIG);
      this.customizeStatusBar(config.statusBar);
      await this.getPermisions(config.permissions);
      this.dataShare.SetFullScreen = (config.navigationBar && config.statusBar.enabled);
      console.log('reached the end withour erroring!');
    } catch (error) {
      console.error(error);
    }
  }

  async toggleFullScreenMode() {
    try {
      if (this.dataShare.IsFullScreen) {
        await this.statusBarService.hide();
        await this.navBar.setUp(true);
        this.dataShare.SetFullScreen = true;
      } else {
        await this.statusBarService.show();
        await this.navBar.setUp(false);
        this.dataShare.SetFullScreen = false;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async getPermisions(permissions: string[]) {
    permissions.forEach(async permission => {
      try {
        if (!(await this.permissions.hasPermission(permission)).hasPermission) {
          await this.permissions.requestPermission(permission)
        }
      } catch (error) {
        console.error(error);
      }
    });
  }

  customizeNavigationBar(enable: boolean) {
    this.navBar.setUp(enable);
  }

  customizeStatusBar(statusBar: StatusBar) {
    if (statusBar.enabled) {
      this.statusBarService.backgroundColorByHexString(statusBar.color);
    } else {
      this.statusBarService.hide();
    }
  }

}
