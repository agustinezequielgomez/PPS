import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplashScreenComponent } from './Components/splash-screen/splash-screen.component';
import { LoginScreenComponent } from './Components/login-screen/login-screen.component';
import { LoginFormComponent } from './Components/login-form/login-form.component';
import { MaterialModule } from '../material.module';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AccessRoutingModule } from './access-routing.module';
import { UsersListComponent } from './Components/users-list/users-list.component';



@NgModule({
  declarations: [
    SplashScreenComponent,
    LoginScreenComponent,
    LoginFormComponent,
    UsersListComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule.forRoot(),
    AccessRoutingModule
  ],
  exports: [
    SplashScreenComponent
  ],
  entryComponents: [
    UsersListComponent
  ]
})
export class AccessModule { }
