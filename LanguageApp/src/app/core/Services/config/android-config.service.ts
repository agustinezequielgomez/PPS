import { Injectable } from '@angular/core';
import { AndroidPermissions as PermissionService } from '@ionic-native/android-permissions/ngx';
import { NavigationBar } from '@ionic-native/navigation-bar/ngx';
import { AppConfig, StatusBar as StatusBarModel } from '../../Models/Classes/app-config';
import { StorageKeys } from '../../Models/Enums/storage-keys.enum';
import { DataShareService } from '../data-share.service';
import { IConfigService } from '../Interfaces/iconfig-service';
import { StorageService } from '../storage.service';
import { Plugins, StatusBarAnimation } from '@capacitor/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
const { StatusBar } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class AndroidConfigService implements IConfigService {

  constructor(private storage: StorageService, private navBar: NavigationBar,
              private permissions: PermissionService, private dataShare: DataShareService, 
              private orientation: ScreenOrientation) { }

  async loadAppConfiguration(): Promise<void> {
    try {
      this.orientation.lock(this.orientation.ORIENTATIONS.PORTRAIT);
      const config = await this.storage.getStorage<AppConfig>(StorageKeys.CONFIG);
      await this.customizeStatusBar(config.statusBar);
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
        await StatusBar.hide({animation: StatusBarAnimation.Fade});
        await this.navBar.setUp(true);
        this.dataShare.SetFullScreen = true;
      } else {
        await StatusBar.show({animation: StatusBarAnimation.Fade});
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
        if (!(await this.permissions.checkPermission(permission)).hasPermission) {
          await this.permissions.requestPermission(permission);
        }
      } catch (error) {
        console.error(error);
      }
    });
  }

  customizeNavigationBar(enable: boolean) {
    this.navBar.setUp(enable);
  }

  async customizeStatusBar(statusBar: StatusBarModel) {
    if (statusBar.enabled) {
      StatusBar.setBackgroundColor({color: statusBar.color});
    } else {
      await StatusBar.hide({animation: StatusBarAnimation.Fade});
    }
  }

}
