import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CardData } from 'src/app/core/Models/Interfaces/cards-data';
import { AudioService } from '../../../core/Services/audio.service';
import { DataShareService } from '../../../core/Services/data-share.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit, OnDestroy {

  @Input() public id: number;
  @Input() public cardInfo: CardData;
  constructor(private audio: AudioService, private data: DataShareService) { }

  async ngOnDestroy() {
    await this.audio.unload(this.cardInfo.cardId);
  }

  async ngOnInit() {
    await this.audio.preloadFileLocation(this.cardInfo.cardId, this.cardInfo.audioPath);
  }

  async playAudio() {
    await this.audio.playAudioFile(this.cardInfo.cardId);
  }
}
