import { Component } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NavController, Platform } from '@ionic/angular';
import { InitService } from './core/Services/init.service';
import { routingAnimation } from './core/animations/animations';
import { Plugins } from '@capacitor/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { DataShareService } from './core/Services/data-share.service';
const { SplashScreen } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  animations: []
})
export class AppComponent {

  public hideSplashAnimation = false;
  public routerMargin: boolean;
  public get RoutingAnimation() {
    return routingAnimation;
  }

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private initService: InitService,
    private router: Router,
    private share: DataShareService,
    private nav: NavController,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.backButton.subscribe((val) => {
      if (this.router.url === '/slider') {
        this.nav.navigateRoot(['main'], {animationDirection: 'back'});
      } else {
        this.nav.back();
      }
    });
    this.router.events.subscribe(event => {
      this.share.DisplayMenuHeader = this.routerMargin = !(this.router.url === '/' || this.router.url.startsWith('/preview'));
    });
    this.platform.ready().then(async () => {
      this.initService.init();
      this.statusBar.styleDefault();
      await SplashScreen.hide();
    });
  }
}
