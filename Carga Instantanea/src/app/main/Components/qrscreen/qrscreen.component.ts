import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DatabaseService } from '../../../core/Services/database.service';
import { StorageService } from '../../../core/Services/storage.service';
import { DataBaseCollections } from '../../../core/Models/Enums/data-base-collections.enum';
import { StorageKeys } from 'src/app/core/Models/Enums/storage-keys.enum';
import { User } from '../../../core/Models/Classes/user';
import { DataBaseDocumentQR, QRCodes } from '../../../core/Models/Classes/qrcode';

@Component({
  selector: 'app-qrscreen',
  templateUrl: './qrscreen.component.html',
  styleUrls: ['./qrscreen.component.scss'],
})
export class QRScreenComponent implements OnInit {

  public qrCodes: QRCodes = [];
  public total: number;
  private user: User;
  constructor(public nav: NavController, private dataBase: DatabaseService, private storage: StorageService) { }

  async ngOnInit() {
    const user = this.user = await this.storage.getStorage<User>(StorageKeys.USER);
    if (await this.dataBase.documentExists(DataBaseCollections.carga_instantanea, user.email)) {
      this.qrCodes = (await this.dataBase.getDocumentData<DataBaseDocumentQR>(DataBaseCollections.carga_instantanea, user.email))
      .redeemedCodes;
      await this.storage.setStorage(StorageKeys.QR_CODES, this.qrCodes);
      this.total = this.qrCodes.map(x => x.value).reduce((prevVal, val) => prevVal + val);
    } else {
      await this.dataBase.setUpdateDocument<DataBaseDocumentQR>(DataBaseCollections.carga_instantanea, user.email, {redeemedCodes: []});
    }
  }

  openQrScanner() {
    this.nav.navigateRoot('scanner', {animationDirection: 'forward'});
  }

  async removeCredits() {
    this.qrCodes = [];
    await this.dataBase.setUpdateDocument<DataBaseDocumentQR>(DataBaseCollections.carga_instantanea, this.user.email, {redeemedCodes: []});
  }
}
