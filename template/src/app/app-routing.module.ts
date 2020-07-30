import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SplashScreenComponent } from './access/Components/splash-screen/splash-screen.component';
import { LoginFormComponent } from './access/Components/login-form/login-form.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./access/access.module').then(m => m.AccessModule)
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
