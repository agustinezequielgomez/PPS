import { Component, OnInit } from '@angular/core';
import { StorageKeys } from 'src/app/core/Models/Enums/storage-keys.enum';
import { FirebaseUserDocument, Photos } from '../../../core/Models/Classes/photo';
import { User } from '../../../core/Models/Classes/user';
import { DataBaseCollections } from '../../../core/Models/Enums/data-base-collections.enum';
import { DatabaseService } from '../../../core/Services/database.service';
import { StorageService } from '../../../core/Services/storage.service';

@Component({
  selector: 'app-my-photos',
  templateUrl: './my-photos.component.html',
  styleUrls: ['./my-photos.component.scss'],
})
export class MyPhotosComponent implements OnInit {

  public displaySkeleton = true;
  public photos: Photos;
  constructor(private dataBase: DatabaseService, private storage: StorageService) { }

  async ngOnInit() {
    const userName = (await this.storage.getStorage<User>(StorageKeys.USER)).email;
    try {
      this.photos = (await this.dataBase.getDocumentData<FirebaseUserDocument>(DataBaseCollections.opinApp_photos, userName)).photos;
      this.displaySkeleton = false;
    } catch (error) {
      console.info(error);
    }
  }

}
