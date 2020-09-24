import { Component, Input, OnInit } from '@angular/core';
import { NavController, IonSlides } from '@ionic/angular';
import { DataShareService } from '../../../core/Services/data-share.service';
import { DatabaseService } from '../../../core/Services/database.service';
import { DataBaseCollections } from '../../../core/Models/Enums/data-base-collections.enum';
import { FirebaseUserDocument, Photos } from '../../../core/Models/Classes/photo';
import { StorageService } from '../../../core/Services/storage.service';
import { StorageKeys } from 'src/app/core/Models/Enums/storage-keys.enum';
import { User } from 'src/app/core/Models/Classes/user';
import { CameraService } from '../../../core/Services/camera.service';

@Component({
  selector: 'app-slider-controls',
  templateUrl: './slider-controls.component.html',
  styleUrls: ['./slider-controls.component.scss'],
})
export class SliderControlsComponent implements OnInit {

  @Input() slider: IonSlides;
  public disableButtons: boolean;
  constructor(private nav: NavController, private share: DataShareService, private camera: CameraService) { }

  ngOnInit() {
    this.share.RecentlyCapturedPhotosObservable.subscribe(photos => this.disableButtons = photos.length === 0);
  }

  addPhoto() {
    this.nav.navigateRoot(['camera'], {animationDirection: 'forward'});
  }

  async removePhoto() {
    const photoIndex = await this.slider.getActiveIndex();
    this.share.RecentlyCapturedPhotos.splice(photoIndex, 1);
    this.disableButtons = (this.share.RecentlyCapturedPhotos.length === 0);
  }

  async uploadPhotos() {
    this.share.UploadPhotosStatus = null;
    this.nav.navigateRoot('progress', {animationDirection: 'forward'});
    await this.camera.uploadPictures();
  }

}
