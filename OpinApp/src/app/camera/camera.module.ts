import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CameraRoutingModule } from './camera-routing.module';
import { MaterialModule } from '../material.module';
import { IonicModule } from '@ionic/angular';
import { CameraComponent } from './Components/camera/camera.component';
import { SliderComponent } from './Components/slider/slider.component';
import { SliderControlsComponent } from './Components/slider-controls/slider-controls.component';
import { ProgressOverlayComponent } from './Components/progress-overlay/progress-overlay.component';


@NgModule({
  declarations: [
    CameraComponent,
    SliderComponent,
    SliderControlsComponent,
    ProgressOverlayComponent
  ],
  imports: [
    CommonModule,
    CameraRoutingModule,
    MaterialModule,
    IonicModule.forRoot()
  ]
})
export class CameraModule { }
