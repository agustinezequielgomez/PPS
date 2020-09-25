import { Component, OnInit } from '@angular/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { CardsData } from 'src/app/core/Models/Interfaces/cards-data';
import { DataShareService } from '../../../core/Services/data-share.service';

@Component({
  selector: 'app-cards-screen',
  templateUrl: './cards-screen.component.html',
  styleUrls: ['./cards-screen.component.scss'],
})
export class CardsScreenComponent implements OnInit {

  public currentDisplayingCards: CardsData;
  public puffingOut = false;
  public puffingIn = true;
  constructor(private data: DataShareService, private orientation: ScreenOrientation) { }

  ngOnInit() {
    this.orientation.unlock();
    this.data.CardsDataObservable.subscribe(data => this.currentDisplayingCards = data);
  }
}
