import { Component, Input, OnInit } from '@angular/core';
import { timeStamp } from 'console';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { Photo } from '../../../core/Models/Classes/photo';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent implements OnInit {

  @Input() photo: Photo;
  @Input() allowVoting: boolean;
  @Input() alreadyVoted: boolean;
  constructor(public nav: NavController) { }

  ngOnInit() {
    this.photo.takenAt = new Date(this.photo.fileName.split('_')[1]);
  }

  goToPreview() {
    this.nav.navigateRoot([`/preview`, this.photo.photoUrl, this.allowVoting, this.alreadyVoted], {animationDirection: 'forward'});
  }
}
