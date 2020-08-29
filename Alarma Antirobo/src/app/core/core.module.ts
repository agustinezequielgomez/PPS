import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { NavigationBar } from '@ionic-native/navigation-bar/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [
    AppVersion,
    NavigationBar,
    AndroidPermissions,
    NativeAudio,
    ScreenOrientation
  ],
})
export class CoreModule { }
