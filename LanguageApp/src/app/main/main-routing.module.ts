import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardsScreenComponent } from './Components/cards-screen/cards-screen.component';


const routes: Routes = [
  {
    path: '',
    component: CardsScreenComponent
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
