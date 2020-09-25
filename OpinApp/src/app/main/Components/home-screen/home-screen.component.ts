import { Component, OnInit } from '@angular/core';
import { DataShareService } from '../../../core/Services/data-share.service';
import { StorageService } from '../../../core/Services/storage.service';
import { User } from '../../../core/Models/Classes/user';
import { StorageKeys } from 'src/app/core/Models/Enums/storage-keys.enum';
import { BuildingAspect } from '../../../core/Models/Enums/building-aspect.enum';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.scss'],
})
export class HomeScreenComponent implements OnInit {

  constructor(private storage: StorageService) { }


  public get Positive(): BuildingAspect {
    return BuildingAspect.Positive;
  }

  public get Negative(): BuildingAspect {
    return BuildingAspect.Negative;
  }

  async ngOnInit() {
    console.log(await this.storage.getStorage<User>(StorageKeys.USER));
  }

}
