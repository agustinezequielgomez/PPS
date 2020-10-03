import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { QRScreenComponent } from './Components/qrscreen/qrscreen.component';
import { IonicModule } from '@ionic/angular';
import { QRScanner } from '@ionic-native/qr-scanner/ngx';
import { ScannerComponent } from './Components/scanner/scanner.component';


@NgModule({
  declarations: [
    QRScreenComponent,
    ScannerComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    IonicModule.forRoot()
  ],
  providers: [
    QRScanner
  ]
})
export class MainModule { }
