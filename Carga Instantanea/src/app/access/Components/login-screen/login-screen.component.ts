import { Component, OnInit } from '@angular/core';
import { ComponentCreatorService } from '../../../core/Services/component-creator.service';
import { DataShareService } from '../../../core/Services/data-share.service';
import { TestUser } from '../../../core/Models/Classes/test-user';
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
  public testUser: string;
  constructor(private creator: ComponentCreatorService, public share: DataShareService) { }

  ngOnInit() {}

  displayUserList() {
    this.creator.createColumnPicker<TestUser>(this.pickUser.bind(this), this.share.TestUsers, 'users', 'correo', 'md');
  }

  pickUser(event) {
      this.share.TestUser = this.share.TestUsers.find(user => user.correo === event.detail.value);
  }
}
