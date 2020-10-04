import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../../../core/Models/Classes/message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {

  @Input() message: Message;
  @Input() selfMessage: boolean;
  @Input() color: 'primary' | 'secondary';
  public extrasCcolor: 'var(--ion-color-primary)' | '#3b1900';
  public textColor: 'white' | '#3b1900';
  constructor() {
    console.log(this.color);
    this.extrasCcolor = this.color === 'primary' ? 'var(--ion-color-primary)' : '#3b1900';
    this.textColor = this.color === 'primary' ? 'white' : '#3b1900';
  }

  ngOnInit() {}

}
