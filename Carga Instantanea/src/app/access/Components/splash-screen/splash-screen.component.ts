import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationService } from '../../../core/Services/animation.service';
import { Animation } from '@ionic/angular';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss'],
})
export class SplashScreenComponent implements OnInit, AfterViewInit {

  @Output() destroyComponent = new EventEmitter<void>();
  @ViewChild('scanner', {static: true}) scanner: ElementRef;
  @ViewChild('money', {static: true}) money: ElementRef;
  @ViewChild('title', {static: true}) title: ElementRef;
  @ViewChild('text', {static: true}) text: ElementRef;
  @ViewChild('splash', {static: true}) splash: ElementRef;
  constructor(private router: Router) {
    // setTimeout(() => this.router.navigate(['login']), 5000);
   }

   async ngAfterViewInit() {
    const scannerAnimation = AnimationService.createAnimation(this.scanner.nativeElement, 7000, 1,
      {property: 'top', fromValue: '30%', toValue: '68%'}, 'normal', 'cubic-bezier', [.37, -.12, .34, .72]);
    const moneyAnimation = AnimationService.createKeyFramedAnimation(this.money.nativeElement, 1250, 1, [
        { offset: 0, opacity: 0 },
        { offset: 0, transform: 'scaleX(0) scaleY(0) scaleZ(0)' },
        { offset: 0, 'animation-timing-function': 'cubic-bezier(0.47, 0, 0.745, 0.715)' },
        { offset: 0.2, opacity: 1 },
        { offset: 0.2, transform: 'scaleX(0) scaleY(0) scaleZ(0)' },
        { offset: 0.2, 'animation-timing-function': 'cubic-bezier(0.47, 0, 0.745, 0.715)' },
        { offset: 0.4, opacity: 1 },
        { offset: 0.4, transform: 'scaleX(1.08) scaleY(1.08) scaleZ(1.08)' },
        { offset: 0.4, 'animation-timing-function': 'cubic-bezier(0.47, 0, 0.745, 0.715)' },
        { offset: 0.6, opacity: 1 },
        { offset: 0.6, transform: 'scaleX(1) scaleY(1) scaleZ(1)' },
        { offset: 0.6, 'animation-timing-function': 'cubic-bezier(0.42, 0, 0.58, 1)' },
        { offset: 0.8, opacity: 1 },
        { offset: 0.8, transform: 'scaleX(1.03) scaleY(1.03) scaleZ(1.03)' },
        { offset: 0.8, 'animation-timing-function': 'cubic-bezier(0.42, 0, 0.58, 1)' },
        { offset: 1, opacity: 1 },
        { offset: 1, transform: 'scaleX(1) scaleY(1) scaleZ(1)' },
        { offset: 1, 'animation-timing-function': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }
      ], 'normal', 'linear').addElement(this.title.nativeElement).addElement(this.text.nativeElement).delay(3500);

    const splashExitAnimation = AnimationService.createKeyFramedAnimation(this.splash.nativeElement, 1000, 1, [
        { offset: 0, opacity: 1 },
        { offset: 0, transform: 'scaleX(1) scaleY(1) scaleZ(1)' },
        { offset: 0, 'animation-timing-function': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' },
        { offset: 0.6, opacity: 1 },
        { offset: 0.6, transform: 'scaleX(1.08) scaleY(1.08) scaleZ(1.08)' },
        { offset: 0.6, 'animation-timing-function': 'cubic-bezier(0.42, 0, 0.58, 1)' },
        { offset: 0.8, opacity: 1 },
        { offset: 0.8, transform: 'scaleX(1.08) scaleY(1.08) scaleZ(1.08)' },
        { offset: 0.8, 'animation-timing-function': 'cubic-bezier(0.42, 0, 0.58, 1)' },
        { offset: 1, opacity: 0 },
        { offset: 1, transform: 'scaleX(0.3) scaleY(0.3) scaleZ(0.3)' },
        { offset: 1, 'animation-timing-function': 'cubic-bezier(0.47, 0, 0.745, 0.715)' }
      ], 'normal', 'linear').delay(5500);
    await AnimationService.createGroupedAnimations(7000, 1, scannerAnimation, moneyAnimation, splashExitAnimation).play();
    this.destroyComponent.emit();

  }


  ngOnInit() {}

}
