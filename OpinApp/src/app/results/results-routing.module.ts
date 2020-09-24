import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyPhotosComponent } from './Components/my-photos/my-photos.component';
import { PhotoPreviewComponent } from './Components/photo-preview/photo-preview.component';
import { AllPhotosComponent } from './Components/all-photos/all-photos.component';
import { PieChartComponent } from './Components/pie-chart/pie-chart.component';
import { BarChartComponent } from './Components/bar-chart/bar-chart.component';


const routes: Routes = [
  {
    path: '',
    component: MyPhotosComponent
  },
  {
    path: 'preview/:url/:allowVoting/:alreadyVoted',
    component: PhotoPreviewComponent
  },
  {
    path: 'allPictures/:aspect',
    component: AllPhotosComponent
  },
  {
    path: 'pie-chart',
    component: PieChartComponent
  },
  {
    path: 'bar-chart',
    component: BarChartComponent
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultsRoutingModule { }
