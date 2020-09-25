import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'firebase';
import { StorageKeys } from 'src/app/core/Models/Enums/storage-keys.enum';
import { FirebaseUserDocument, Photos } from '../../../core/Models/Classes/photo';
import { BuildingAspect } from '../../../core/Models/Enums/building-aspect.enum';
import { DataBaseCollections } from '../../../core/Models/Enums/data-base-collections.enum';
import { DatabaseService } from '../../../core/Services/database.service';
import { StorageService } from '../../../core/Services/storage.service';
import { DataShareService } from '../../../core/Services/data-share.service';

@Component({
  selector: 'app-all-photos',
  templateUrl: './all-photos.component.html',
  styleUrls: ['./all-photos.component.scss'],
})
export class AllPhotosComponent implements OnInit {

  public photos: Photos = [];
  public displaySkeleton = true;
  public votedPhotos: string[] = [];
  private aspect: string;
  constructor(private data: DatabaseService, private storage: StorageService, private route: ActivatedRoute,
              private share: DataShareService) { }

  async ngOnInit() {
    this.route.params.subscribe(parms => this.aspect = parms.aspect);
    const userName = (await this.storage.getStorage<User>(StorageKeys.USER)).email;
    const collection = await (await this.data.getCollection<Photos>(DataBaseCollections.opinApp_photos).get()).toPromise();
    for (const doc of collection.docs) {
      if (doc.id !== userName) {
        if (doc.data().photos !== undefined) {
          this.photos.push(...(doc.data() as FirebaseUserDocument).photos.filter(photo => photo.buildingAspect === this.aspect));
        }
      } else {
        this.votedPhotos = ((doc.data() as FirebaseUserDocument).voted);
      }
    }
    this.photos = this.sortByDate();
    this.displaySkeleton = false;

    this.share.RegisterVoteObservable.subscribe(async (url) => await this.votePicture(url));
  }

  private sortByDate(): Photos {
    return this.photos.sort((ph1, ph2) => (ph1.takenAt === ph2.takenAt) ? 0 : (ph1.takenAt < ph2.takenAt) ? 1 : -1);
  }

  private async votePicture(url: string) {
    if (url !== null) {
      const photoAuthor = this.photos.find(photo => photo.photoUrl === url).takenBy;
      const photoGrapherCollection = (await this.data.getDocumentData<FirebaseUserDocument>(DataBaseCollections.opinApp_photos,
                                      photoAuthor));
      photoGrapherCollection.photos.find(photo => photo.photoUrl === url).votes++;
      await this.data.setUpdateDocument<FirebaseUserDocument>(DataBaseCollections.opinApp_photos, photoAuthor, photoGrapherCollection);
      const userName = (await this.storage.getStorage<User>(StorageKeys.USER)).email;
      this.votedPhotos.push(url);
      await this.data.setUpdateDocument<{voted: string[]}>(DataBaseCollections.opinApp_photos, userName,
      {voted: this.votedPhotos});
    }
  }
}
