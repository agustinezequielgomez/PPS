import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QRScreenComponent } from './Components/qrscreen/qrscreen.component';
import { ScannerComponent } from './Components/scanner/scanner.component';


const routes: Routes = [
  {
    path: '',
    component: QRScreenComponent
  },
  {
    path: 'scanner',
    component: ScannerComponent
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
