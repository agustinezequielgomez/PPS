import { Injectable } from '@angular/core';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';
import { Subscription } from 'rxjs';
import { ScreenOrientation } from '../Models/Enums/screen-orientation.enum';
import { DataShareService } from './data-share.service';

@Injectable({
  providedIn: 'root'
})
export class GyroscopeService {

  private subscription: Subscription;
  constructor(private motion: DeviceMotion, private share: DataShareService) { }

  public async startGyroscopeWatch(): Promise<boolean> {
    if (this.OnTable(await this.motion.getCurrentAcceleration())) {
      this.subscription = this.motion.watchAcceleration({frequency: 500}).subscribe(orientation => {
        if (this.IsVertical(orientation)) {
          this.share.ScreenOrientation = ScreenOrientation.Vertical;
        } else {
          if (this.IsTiltLeft(orientation)) {
            this.share.ScreenOrientation = ScreenOrientation.LeftTilt;
          } else if (this.IsTiltRight(orientation)) {
            this.share.ScreenOrientation = ScreenOrientation.RightTilt;
          } else {
            this.share.ScreenOrientation = ScreenOrientation.Horizontal;
          }
        }
      });

      return true;
    }
    return false;
  }

  public stopGyroscopeWatch() {
    this.subscription.unsubscribe();
  }

  private IsVertical(data: DeviceMotionAccelerationData): boolean {
    return (Math.round(data.y) > 8 || Math.round(data.y) < -8);
  }

  private OnTable(data: DeviceMotionAccelerationData): boolean {
    return (Math.round(data.y) === 0 && Math.round(data.x) === 0);
  }

  private IsTiltRight(data: DeviceMotionAccelerationData): boolean {
    return (Math.round(data.x) < -3);
  }

  private IsTiltLeft(data: DeviceMotionAccelerationData): boolean {
    return (Math.round(data.x) > 3);
  }
}
