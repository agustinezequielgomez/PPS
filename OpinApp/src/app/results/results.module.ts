import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ChartsModule } from 'ng2-charts';
import { MaterialModule } from '../material.module';
import { AllPhotosComponent } from './Components/all-photos/all-photos.component';
import { ListItemComponent } from './Components/list-item/list-item.component';
import { ListSkeletonComponent } from './Components/list-skeleton/list-skeleton.component';
import { MyPhotosComponent } from './Components/my-photos/my-photos.component';
import { PhotoPreviewComponent } from './Components/photo-preview/photo-preview.component';
import { ResultsRoutingModule } from './results-routing.module';
import { PieChartComponent } from './Components/pie-chart/pie-chart.component';
import { BarChartComponent } from './Components/bar-chart/bar-chart.component';



@NgModule({
  declarations: [
    MyPhotosComponent,
    ListSkeletonComponent,
    ListItemComponent,
    PhotoPreviewComponent,
    AllPhotosComponent,
    PieChartComponent,
    BarChartComponent
  ],
  imports: [
    CommonModule,
    ResultsRoutingModule,
    MaterialModule,
    IonicModule.forRoot(),
    ChartsModule
  ]
})
export class ResultsModule { }
