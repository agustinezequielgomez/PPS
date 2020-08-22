import { Injectable } from '@angular/core';
import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope/ngx';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GyroscopeService {

  // private gyroscopeSubscription: Observable<GyroscopeOrientation>;
  constructor() { }

  // public startGyroscopeWatch() {
  //   this.gyroscopeSubscription = this.gyroscope.watch();
  //   this.gyroscope.watch({ frequency: 1500 }).subscribe((orientation) => {

  //   });
  // }
}
