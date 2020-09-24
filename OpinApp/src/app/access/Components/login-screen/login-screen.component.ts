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
  constructor(private creator: ComponentCreatorService, private share: DataShareService) { }

  ngOnInit() {}

  displayUserList() {
    this.creator.createColumnPicker<TestUser>(this.pickUser.bind(this), this.share.TestUsers, 'users', 'correo', 'md', true, );
  }

  pickUser(user: TestUser) {
    this.share.TestUser = user;
  }
}
