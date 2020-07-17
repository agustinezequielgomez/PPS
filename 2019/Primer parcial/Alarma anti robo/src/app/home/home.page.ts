import { Component, OnInit } from '@angular/core';
import { DataService } from '../Services/data.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AuthService } from '../Services/auth.service';
import { DeviceMotion, DeviceMotionAccelerationData, DeviceMotionAccelerometerOptions } from '@ionic-native/device-motion/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { timer, interval } from 'rxjs';
import { Flashlight } from '@ionic-native/flashlight/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  userName: string;
  public x: number;
  public y: number;
  public z: number;
  public activated = false;
  public text = 'Activar';
  public interval = 1000;
  public startPosition = true;
  constructor(private data: DataService, private router: Router, private storage: Storage, private authService: AuthService,
              private deviceMotion: DeviceMotion, private orientation: ScreenOrientation, private flashlight: Flashlight,
              private vibration: Vibration) {
  }

  ngOnInit() {
    this.orientation.lock('portrait');
    interval(this.interval).subscribe(() => {
      this.deviceMotion.getCurrentAcceleration().then((acceleration: DeviceMotionAccelerationData) => {
        if (this.activated) {
          if (acceleration.x > 6) {
              this.startPosition = false;
              this.vibration.vibrate(0);
              this.playAudio('../../assets/AIUDA.m4a');
          } else if (acceleration.x < -6) {
            this.startPosition = false;
            this.vibration.vibrate(0);
            this.playAudio('../../assets/AUXILIO.m4a');
          } else if (acceleration.y > 7) {
            this.startPosition = false;
            this.vibration.vibrate(0);
            this.playAudio('../../assets/SOS.m4a');
            this.flashlight.switchOn();
            timer(5000).subscribe(() => {
              this.flashlight.switchOff();
            });
          } else if (acceleration.x < 1 && acceleration.x > -1 && acceleration.y < 1 && acceleration.y > -1 &&
            this.startPosition === false) {
            this.playAudio('../../assets/AAA.m4a');
            this.vibration.vibrate(5000);
            this.wait(500);
          }
        }
      });
    });
  }

  wait(ms) {
    var start = Date.now(),
        now = start;
    while (now - start < ms) {
      now = Date.now();
    }
}

  changeState() {
    this.activated = !this.activated;
    if (this.activated) {
      this.text = 'Desactivar';
    } else {
      this.text = 'Activar';
    }
  }

  playAudio(src: string) {
    const AUDIO = new Audio();
    AUDIO.src = src;
    AUDIO.load();
    AUDIO.play();
  }

  cerrarSesion() {
    this.storage.clear();
    this.authService.logOut();
    this.router.navigate(['/login']);
  }
}
