import { Component, OnInit } from '@angular/core';
import { DataShareService } from '../../../core/Services/data-share.service';

@Component({
  selector: 'app-menu-button',
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.scss'],
})
export class MenuButtonComponent implements OnInit {

  public displayHeader = false;
  constructor(private share: DataShareService) { }

  ngOnInit() {
    this.share.DisplayMenuObservable.subscribe(display => this.displayHeader = display);
  }

}
