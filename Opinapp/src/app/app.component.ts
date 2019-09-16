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
  public goodBuilding = false;
  public badBuilding = false;
  public Opinapp = false;
  public fadeOutAnimation = false;
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
      timer(3000).subscribe(() => this.Opinapp = true);
      timer(3500).subscribe(() => this.Opinapp = false);
    });
  }
}
