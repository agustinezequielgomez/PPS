import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginScreenComponent } from './Components/login-screen/login-screen.component';
import { SplashScreenComponent } from './Components/splash-screen/splash-screen.component';
import { LoginFormComponent } from './Components/login-form/login-form.component';

const routes: Routes = [
    {
        path: 'login',
        component: LoginFormComponent,
        data: {state: 'loginScreen'}
    },
    {
        path: '',
        component: SplashScreenComponent,
        data: {state: 'splashScreen'}
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
export class AccessRoutingModule { }
