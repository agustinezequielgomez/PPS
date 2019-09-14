import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public showAnimation = true;
  public showShield = false;
  public showPhone = false;
  public wobble = false;
  public text = false;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.storage.get('logged').then((val) =>
      {
        if(val === true)
        {
          this.router.navigate(['/home']);
        }
        else
        {
          this.router.navigate(['/login']);
        }
      });
      setTimeout(() => {
        this.showShield = true;
      }, 500);
      setTimeout(() => {
        this.showPhone = true;
      }, 1500);
      setTimeout(() => {
        this.wobble = true;
      }, 1900);
      setTimeout(() => {
        this.text = true;
      }, 2500);
      setTimeout(() => {
        this.showAnimation = false;
      }, 10000);
    });
  }
}
