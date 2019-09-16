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
  public message1 = false;
  public message2 = false;
  public message3 = false;
  public title = false;
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
      this.animateSplash();
    });
  }

  animateSplash()
  {
    const AUDIO = new Audio();
    timer(1000).subscribe(() => {
      AUDIO.src = '../assets/sounds/pop1.mp3';
      AUDIO.load();
      AUDIO.play();
      this.message1 = true;
    });
    timer(2000).subscribe(() => {
      AUDIO.src = '../assets/sounds/pop2.mp3';
      AUDIO.load();
      AUDIO.play();
      this.message2 = true;
    });
    timer(3000).subscribe(() => {
      AUDIO.src = '../assets/sounds/pop3.mp3';
      AUDIO.load();
      AUDIO.play();
      this.message3 = true;
    });
    timer(3500).subscribe(() => this.title = true);
    timer(5000).subscribe(() => this.fadeOutAnimation = true);
    timer(7000).subscribe(() => this.showAnimation = false);
  }
}

