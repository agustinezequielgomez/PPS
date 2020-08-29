import { Component } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';
import { InitService } from './core/Services/init.service';
import { routingAnimation } from './core/animations/animations';
import { Plugins } from '@capacitor/core';
import { StorageService } from './core/Services/storage.service';
import { StorageKeys } from './core/Models/Enums/storage-keys.enum';
const { SplashScreen } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  animations: []
})
export class AppComponent {

  public hideSplashAnimation = true;
  public get RoutingAnimation() {
    return routingAnimation;
  }

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private initService: InitService,
    private storage: StorageService
  ) {
    this.storage.getStorage<boolean>(StorageKeys.SPLASH_SCREEN).then(splash => {
      if (splash === true) {
        this.hideSplashAnimation = false;
      }
    });
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      await this.initService.init();
      this.statusBar.styleDefault();
      this.hideSplashAnimation = false;
      this.storage.setStorage(StorageKeys.SPLASH_SCREEN, true);
      await SplashScreen.hide();
    });
  }
}
