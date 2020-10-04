import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { IonicModule } from '@ionic/angular';
import { HomeScreenComponent } from './Components/home-screen/home-screen.component';


@NgModule({
  declarations: [
    HomeScreenComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    IonicModule.forRoot()
  ]
})
export class MainModule { }
