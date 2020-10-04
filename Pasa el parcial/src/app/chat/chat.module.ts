import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { IonicModule } from '@ionic/angular';
import { ChatRoomComponent } from './Components/chat-room/chat-room.component';
import { HeaderComponent } from './Components/header/header.component';
import { MessageComponent } from './Components/message/message.component';
import { InputComponent } from './Components/input/input.component';


@NgModule({
  declarations: [
    ChatRoomComponent,
    HeaderComponent,
    MessageComponent,
    InputComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    IonicModule.forRoot()
  ]
})
export class ChatModule { }
