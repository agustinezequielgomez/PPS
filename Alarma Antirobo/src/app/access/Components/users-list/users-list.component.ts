import { Component, OnInit } from '@angular/core';
import { DataShareService } from '../../../core/Services/data-share.service';
import { TestUser, TestUsers } from '../../../core/Models/Classes/test-user';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {

  constructor(public share: DataShareService, private controller: PopoverController) { }

  ngOnInit() { }

  async selectUser(user: TestUser) {
   await this.controller.dismiss(user);
  }
}
