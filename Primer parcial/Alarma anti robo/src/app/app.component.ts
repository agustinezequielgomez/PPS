import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { timer } from 'rxjs';


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
  public bounceOut = false;
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
      this.storage.get('logged').then((val) => {
        if (val === true) {
          this.router.navigate(['/home']);
        } else {
          this.router.navigate(['/login']);
        }
    });
      this.handleAnimations();
  });
}

handleAnimations() {
  timer(500).subscribe(() => this.showShield = true);
  timer(1500).subscribe(() => this.showPhone = true);
  timer(1700).subscribe(() => this.wobble = true);
  timer(2500).subscribe(() => this.text = true);
  timer(4000).subscribe(() => this.bounceOut = true);
  timer(4750).subscribe(() => this.showAnimation = false);
}
}
