import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IonSlides, NavController } from '@ionic/angular';
import { Photos } from '../../../core/Models/Classes/photo';
import { DataShareService } from '../../../core/Services/data-share.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {

  @ViewChild('slider') slider: IonSlides;
  public photos: Photos;
  constructor(private share: DataShareService, public sanitizer: DomSanitizer) { }

  async ngOnInit() {
    this.share.RecentlyCapturedPhotosObservable.subscribe(photos => this.photos = photos);
  }
}
