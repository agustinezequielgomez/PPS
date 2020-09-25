import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Camera } from '@capacitor/core';
import { CameraComponent } from './Components/camera/camera.component';
import { SliderComponent } from './Components/slider/slider.component';
import { ProgressOverlayComponent } from './Components/progress-overlay/progress-overlay.component';


const routes: Routes = [
  {
    path: 'slider',
    component: SliderComponent
  },
  {
    path: '',
    component: CameraComponent
  },
  {
    path: 'progress',
    component: ProgressOverlayComponent
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CameraRoutingModule { }
