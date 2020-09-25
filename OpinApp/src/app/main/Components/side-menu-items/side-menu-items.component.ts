import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { BuildingAspect } from '../../../core/Models/Enums/building-aspect.enum';

@Component({
  selector: 'app-side-menu-items',
  templateUrl: './side-menu-items.component.html',
  styleUrls: ['./side-menu-items.component.scss'],
})
export class SideMenuItemsComponent implements OnInit {

  @Input() id: number;
  @Input() label: string;
  @Input() href: string;
  @Input() icon: string;
  @Input() selected = false;
  @Output() clicked = new EventEmitter<void>();
  constructor(private nav: NavController) { }

  ngOnInit() { }

  clickHandler() {
    if (this.id === 2) {
      this.nav.navigateRoot(`${this.href}/${BuildingAspect.Positive}`, {animationDirection: 'forward'});
    } else if (this.id === 3) {
      this.nav.navigateRoot(`${this.href}/${BuildingAspect.Negative}`, {animationDirection: 'forward'});
    } else {
      this.nav.navigateRoot(this.href, {animationDirection: 'forward'});
    }
    this.clicked.emit();
  }

}
