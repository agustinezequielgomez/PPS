import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { DataShareService } from '../../../core/Services/data-share.service';
import { NotificationService } from '../../../core/Services/notification.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-photo-preview',
  templateUrl: './photo-preview.component.html',
  styleUrls: ['./photo-preview.component.scss'],
})
export class PhotoPreviewComponent implements OnInit {

  public imageUrl: string;
  public allowVoting: boolean;
  public alreadyVoted: boolean;
  constructor(private route: ActivatedRoute, public nav: NavController, private share: DataShareService,
              public notif: NotificationService, public location: Location) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.imageUrl = params.url;
      this.allowVoting = JSON.parse(params.allowVoting);
      this.alreadyVoted = JSON.parse(params.alreadyVoted);
    });
  }

  vote() {
    this.alreadyVoted = true;
    this.notif.presentToast('success', '¡Voto registrado con éxito!', 0, 'md', 'bottom');
    this.share.RegisterVoteObservable.next(this.imageUrl);
  }

  showToast() {
    this.notif.presentToast('warning', 'Voto ya registrado', 0, 'md', 'bottom');
  }
}
