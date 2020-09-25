import { Injectable } from '@angular/core';
import { CameraDirection, CameraOptions, CameraResultType, CameraSource, Plugins } from '@capacitor/core';
import { NavController } from '@ionic/angular';
import { FirebaseUserDocument, Photo, Photos } from '../Models/Classes/photo';
import { User } from '../Models/Classes/user';
import { StorageKeys } from '../Models/Enums/storage-keys.enum';
import { StorageService } from './storage.service';
import { DataShareService } from './data-share.service';
import { Router } from '@angular/router';
import { BuildingAspect } from '../Models/Enums/building-aspect.enum';
import { DatabaseService } from './database.service';
import { DataBaseCollections } from '../Models/Enums/data-base-collections.enum';
import { AngularFireStorage } from '@angular/fire/storage';
const { Camera } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  private static readonly CAMERA_OPTIONS: CameraOptions = {
    allowEditing: false,
    correctOrientation: true,
    direction: CameraDirection.Front,
    quality: 20,
    resultType: CameraResultType.Base64,
    saveToGallery: false,
    source: CameraSource.Camera
  };
  constructor(private nav: NavController, private storage: StorageService, private share: DataShareService,
              private dataBase: DatabaseService, private fireStore: AngularFireStorage) { }

  async takePicture() {
    await Camera.requestPermissions();
    const PHOTO = await Camera.getPhoto(CameraService.CAMERA_OPTIONS);
    const userPhoto: Photo = {
      photoUrl: `data:image/${PHOTO.format};base64, ${PHOTO.base64String}`,
      fileName: `${(await this.storage.getStorage<User>(StorageKeys.USER)).email}_${new Date().toISOString()}`,
      takenBy: `${(await this.storage.getStorage<User>(StorageKeys.USER)).email}`,
      takenAt: new Date(),
      buildingAspect: this.share.SelectedBuildingAspect,
      votes: 0
    };
    this.share.RecentlyCapturedPhotos = [...this.share.RecentlyCapturedPhotos, userPhoto];
    this.nav.navigateBack(['slider']);
  }

  async uploadPictures() {
    try {
      const photoArray: Photos = [];
      const documentId = (await this.storage.getStorage<User>(StorageKeys.USER)).email;
      for (const photo of this.share.RecentlyCapturedPhotos) {
        const fileName = `OpinApp/${photo.fileName}`;
        const ref = this.fireStore.ref(fileName);
        await ref.putString(photo.photoUrl, 'data_url', {contentType: 'image/jpeg'});
        photo.photoUrl = await ref.getDownloadURL().toPromise();
        photoArray.push(photo);
      }

      if ((await this.dataBase.documentExists(DataBaseCollections.opinApp_photos, documentId))) {
        const existingDocument = (await this.dataBase.getDocumentData<FirebaseUserDocument>
                                (DataBaseCollections.opinApp_photos, documentId));
        const photos: Photos = (existingDocument.photos !== undefined) ? [...existingDocument.photos, ...photoArray] : photoArray;
        await this.dataBase.setUpdateDocument<FirebaseUserDocument>(
          DataBaseCollections.opinApp_photos,
          documentId,
          {photos: photos, voted: existingDocument.voted});
      } else {
        await this.dataBase.setUpdateDocument<FirebaseUserDocument>(
          DataBaseCollections.opinApp_photos,
          documentId,
          {photos: photoArray, voted: []});
      }
      this.share.UploadPhotosStatus = 'success';
      this.share.RecentlyCapturedPhotos = [];
    }catch (ex) {
      console.log(ex);
      // console.log(`upload error ${{...ex}}`);
    }
  }
}
