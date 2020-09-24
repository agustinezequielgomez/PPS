import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/Models/Classes/user';
import { StorageKeys } from 'src/app/core/Models/Enums/storage-keys.enum';
import { DataShareService } from '../../../core/Services/data-share.service';
import { StorageService } from '../../../core/Services/storage.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {

  public user: User;
  constructor(private share: DataShareService, private storage: StorageService) { }

  async ngOnInit() {
    this.share.DisplayMenuObservable.subscribe(async () => {
      this.user = await this.storage.getStorage<User>(StorageKeys.USER);
    });
  }

}
