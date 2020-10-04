import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonContent, NavController } from '@ionic/angular';
import { ChatDB, Messages } from 'src/app/core/Models/Classes/message';
import { DatabaseService } from '../../../core/Services/database.service';
import { DataBaseCollections } from '../../../core/Models/Enums/data-base-collections.enum';
import { StorageService } from '../../../core/Services/storage.service';
import { User } from 'src/app/core/Models/Classes/user';
import { StorageKeys } from 'src/app/core/Models/Enums/storage-keys.enum';
import { FormFieldsEntranceAnimations } from '../../animations/animations';
import { Plugins } from '@capacitor/core';
const { StatusBar } = Plugins;
@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss'],
  animations: [FormFieldsEntranceAnimations]
})
export class ChatRoomComponent implements OnInit {

  public title: 'PPS 4°A' | 'PPS 4°B';
  public color: 'primary' | 'secondary';
  public backgroundColor: '#cceeff' | '#fff2ca';
  public messages: Messages = [];
  public currentUser: User;
  private statusBarColor = {primary: '#0399e2', secondary: '#ffcd40'};
  @ViewChild('chat') chat: IonContent;
  constructor(private route: ActivatedRoute, private dataBase: DatabaseService, private storage: StorageService) { }

  async ngOnInit() {
    const chatSound = new Audio('assets/sounds/message.ogg');
    chatSound.load();
    this.currentUser = await this.storage.getStorage<User>(StorageKeys.USER);
    this.route.params.subscribe(async (parms) => {
      if (parseInt(parms.id, 10) === 1) {
        this.title = 'PPS 4°A';
        this.color = 'primary';
        this.backgroundColor = '#cceeff';
        await StatusBar.setBackgroundColor({ color: this.statusBarColor.primary });
      } else {
        this.title = 'PPS 4°B';
        this.color = 'secondary';
        this.backgroundColor = '#fff2ca';
        await StatusBar.setBackgroundColor({ color: this.statusBarColor.secondary });
      }
    });
    this.dataBase.getDocumentDataStream<ChatDB>(DataBaseCollections.chatRooms, this.title).subscribe(({messages}) => {
      if (this.messages.length > 0 && messages[messages.length - 1].sentBy !== this.currentUser.email) {
        chatSound.play();
        this.messages.push(messages[messages.length - 1]);
      } else {
        this.messages = messages;
      }
      this.chat.scrollToBottom(100);
    });
  }

  async sendMessage(message: string) {
    this.messages.push({message: message, sentBy: this.currentUser.email, sentAt: new Date().toISOString()});
    console.log(this.messages);
    await this.dataBase.setUpdateDocument<ChatDB>(DataBaseCollections.chatRooms, this.title, {messages: this.messages});
  }

}
