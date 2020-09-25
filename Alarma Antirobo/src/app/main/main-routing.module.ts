import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlarmScreenComponent } from './Components/alarm-screen/alarm-screen.component';


const routes: Routes = [
  {
    path: '',
    component: AlarmScreenComponent,
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
export class MainRoutingModule { }
