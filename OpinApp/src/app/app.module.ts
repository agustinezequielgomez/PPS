import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule, BUCKET } from '@angular/fire/storage';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { AccessModule } from './access/access.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CameraModule } from './camera/camera.module';
import { CoreModule } from './core/core.module';
import { MainModule } from './main/main.module';
import { MaterialModule } from './material.module';
import { ResultsModule } from './results/results.module';




@NgModule({
  declarations: [
    AppComponent,
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    CoreModule,
    BrowserAnimationsModule,
    AccessModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(),
    MainModule,
    CameraModule,
    ResultsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: BUCKET, useValue: environment.firebase.storageBucket }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
