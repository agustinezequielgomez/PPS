import { Component, OnInit } from '@angular/core';
import { ComponentCreatorService } from '../../../core/Services/component-creator.service';
import { DataShareService } from '../../../core/Services/data-share.service';
import { TestUser } from '../../../core/Models/Classes/test-user';
import { UsersListComponent } from '../users-list/users-list.component';
const packageJson = require('../../../../../package.json');

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss'],
})
export class LoginScreenComponent implements OnInit {

  public author: string = packageJson.author;
  public appName: string = packageJson.name;
  public version: string = packageJson.version;
  constructor(private creator: ComponentCreatorService, private share: DataShareService) { }

  ngOnInit() {
    console.log(`WSIZE: ${window.innerWidth} ${window.innerHeight}`);
    const SVG = document.getElementById('svg');
    SVG.setAttribute('width', `${window.innerWidth}`);
    SVG.setAttribute('height', `${window.innerHeight}`);
    SVG.setAttribute('viewBox', `0 0 ${window.innerWidth} ${window.innerHeight}`);
  }

  async displayUserList() {
    try {
      const USER: TestUser = await this.creator.createPopOver<TestUser>(UsersListComponent, 'md', true, 'ion-users-popover');
      if (USER !== undefined) {
        this.pickUser(USER);
      }
    }
    catch (error) {
      console.log(`THE ERROR: ${error}`);
    }
  }

  pickUser(user: TestUser) {
    this.share.TestUser = user;
  }
}
