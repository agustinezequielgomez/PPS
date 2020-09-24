import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BuildingAspect } from '../../../core/Models/Enums/building-aspect.enum';
import { DataShareService } from '../../../core/Services/data-share.service';

@Component({
  selector: 'app-home-screen-card',
  templateUrl: './home-screen-card.component.html',
  styleUrls: ['./home-screen-card.component.scss'],
})
export class HomeScreenCardComponent implements OnInit {

  @Input() imgSrc: string;
  @Input() aspect: BuildingAspect;
  @Input() color: 'primary' | 'secondary';
  @Input() title: string;
  constructor(private router: Router, private share: DataShareService) { }

  ngOnInit() { }

  public async goToCamera() {
    this.share.SelectedBuildingAspect = this.aspect;
    await this.router.navigate(['camera']);
  }
}
