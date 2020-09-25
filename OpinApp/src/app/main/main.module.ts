import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MaterialModule } from '../material.module';
import { HomeScreenCardComponent } from './Components/home-screen-card/home-screen-card.component';
import { HomeScreenComponent } from './Components/home-screen/home-screen.component';
import { MenuButtonComponent } from './Components/menu-button/menu-button.component';
import { SideMenuItemsComponent } from './Components/side-menu-items/side-menu-items.component';
import { SideMenuComponent } from './Components/side-menu/side-menu.component';
import { UserProfileComponent } from './Components/user-profile/user-profile.component';
import { MainRoutingModule } from './main-routing.module';



@NgModule({
  declarations: [
    HomeScreenComponent,
    HomeScreenCardComponent,
    SideMenuComponent,
    MenuButtonComponent,
    UserProfileComponent,
    SideMenuItemsComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialModule,
    IonicModule.forRoot(),
  ],
  exports: [
    SideMenuComponent,
    MenuButtonComponent
  ]
})
export class MainModule { }
