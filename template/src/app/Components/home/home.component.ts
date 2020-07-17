import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../core/Services/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor(public notif: NotificationService) { }

  ngOnInit() {}
}
