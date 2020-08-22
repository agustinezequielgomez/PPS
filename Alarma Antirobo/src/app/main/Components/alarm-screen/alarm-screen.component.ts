import { Component, OnInit } from '@angular/core';
import { DeviceMotion } from '@ionic-native/device-motion/ngx';

@Component({
  selector: 'app-alarm-screen',
  templateUrl: './alarm-screen.component.html',
  styleUrls: ['./alarm-screen.component.scss'],
})
export class AlarmScreenComponent implements OnInit {

  public x: number;
  public y: number;
  public z: number;
  constructor(private motion: DeviceMotion) { }

  async ngOnInit() {
    this.motion.watchAcceleration({frequency: 1500}).subscribe(motion => {
      this.x = motion.x;
      this.y = motion.y;
      this.z = motion.z;
    });
  }
}
