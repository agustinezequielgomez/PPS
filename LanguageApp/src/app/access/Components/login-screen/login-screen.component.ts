import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { ComponentCreatorService } from '../../../core/Services/component-creator.service';
import { DataShareService } from '../../../core/Services/data-share.service';
import { TestUser } from '../../../core/Models/Classes/test-user';
import { interval, timer } from 'rxjs';
import { AudioService } from '../../../core/Services/audio.service';
const packageJson = require('../../../../../package.json');

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss'],
})
export class LoginScreenComponent implements OnInit, AfterViewInit {

  public author: string = packageJson.author;
  public appName: string = packageJson.name;
  public version: string = packageJson.version;
  public loading: boolean = false;
  public animationImg: { imgPath: string, cssClass: string } = { imgPath: '', cssClass: '' };
  @ViewChild('img', {static: true}) loginImg: ElementRef;
  constructor(private creator: ComponentCreatorService, public share: DataShareService, public audio: AudioService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    interval(10000).subscribe(async () => {
      this.animationImg.imgPath = this.share.Animals[Math.floor(Math.random() * this.share.Animals.length)].imgPath;
      await timer(1000).toPromise();
      const { position, animation } = this.share.getLoginAnimation(this.loginImg.nativeElement);
      this.animationImg.cssClass = position;
      await animation.play();
    });
  }

  async pickUser({detail: { value }}) {
    this.share.TestUser = this.share.TestUsers.find(x => x.id === value);
  }

  userCompare = (user1Id: number, user2Id: number) => {
    return user1Id && user2Id ? user1Id === user2Id : user1Id === user2Id;
  }
}
