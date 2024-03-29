import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MaterialModule } from '../material.module';
import { MainRoutingModule } from './main-routing.module';
import { AlarmScreenComponent } from './Components/alarm-screen/alarm-screen.component';
import { PasswordModalComponent } from './Components/password-modal/password-modal.component';



@NgModule({
  declarations: [
    AlarmScreenComponent,
    PasswordModalComponent
  ],
  entryComponents: [
    PasswordModalComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule.forRoot(),
    MainRoutingModule
  ]
})
export class MainModule { }
