import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { FAButtonComponent } from './Components/fabutton/fabutton.component';
import { CardComponent } from './Components/card/card.component';
import { CardsScreenComponent } from './Components/cards-screen/cards-screen.component';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    FAButtonComponent,
    CardComponent,
    CardsScreenComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    IonicModule.forRoot()
  ],
  providers: [
    ScreenOrientation
  ]
})
export class MainModule { }
