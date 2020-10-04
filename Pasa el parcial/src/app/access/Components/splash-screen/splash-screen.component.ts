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

  @ViewChild('splash') splash: ElementRef;
  @ViewChild('message1') message1: ElementRef;
  @ViewChild('message2') message2: ElementRef;
  @ViewChild('message3') message3: ElementRef;
  @ViewChild('message4') message4: ElementRef;
  @ViewChild('appName') appName: ElementRef;
  @ViewChild('myName') myName: ElementRef;
  @ViewChild('course') course: ElementRef;
  @ViewChild('utn') utn: ElementRef;
  @Output() destroyComponent = new EventEmitter<void>();
  constructor(private router: Router) {  }

   async ngAfterViewInit() {
    const pop1 = new Audio('assets/sounds/pop1.mp3');
    pop1.load();
    const pop2 = new Audio('assets/sounds/pop2.mp3');
    pop2.load();
    const pop3 = new Audio('assets/sounds/pop3.mp3');
    pop3.load();
    const popInLeft = (el: Element) => AnimationService.createKeyFramedAnimation(el, 1250, 1, [
      { offset: 0, opacity: 0 },
      { offset: 0, transform: 'translateX(-200px) translateY(0px) translateZ(0) rotate(180deg) scaleX(0.1) scaleY(0.1) scaleZ(0.1)' },
      { offset: 0, 'animation-timing-function': 'cubic-bezier(0.47, 0, 0.745, 0.715)' },
      { offset: 0.4, opacity: 1 },
      { offset: 0.4, transform: 'translateX(0px) translateY(0px) translateZ(0) rotate(180deg) scaleX(1.08) scaleY(1.08) scaleZ(1.08)' },
      { offset: 0.4, 'animation-timing-function': 'cubic-bezier(0.47, 0, 0.745, 0.715)' },
      { offset: 0.6, opacity: 1 },
      { offset: 0.6, transform: 'scaleX(1) scaleY(1) scaleZ(1) rotate(180deg)' },
      { offset: 0.6, 'animation-timing-function': 'cubic-bezier(0.42, 0, 0.58, 1)' },
      { offset: 0.8, opacity: 1 },
      { offset: 0.8, transform: 'scaleX(1.03) scaleY(1.03) scaleZ(1.03) rotate(180deg)' },
      { offset: 0.8, 'animation-timing-function': 'cubic-bezier(0.42, 0, 0.58, 1)' },
      { offset: 1, opacity: 1 },
      { offset: 1, transform: 'scaleX(1) scaleY(1) scaleZ(1) rotate(180deg)' },
      { offset: 1, 'animation-timing-function': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }
    ], 'normal', 'linear');
    const popInRight = (el: Element) => AnimationService.createKeyFramedAnimation(el, 1250, 1, [
      { offset: 0, opacity: 0 },
      { offset: 0, transform: 'translateX(200px) translateY(0px) translateZ(0) rotate(180deg) scaleX(0.1) scaleY(0.1) scaleZ(0.1)' },
      { offset: 0, 'animation-timing-function': 'cubic-bezier(0.47, 0, 0.745, 0.715)' },
      { offset: 0.4, opacity: 1 },
      { offset: 0.4, transform: 'translateX(0px) translateY(0px) translateZ(0) rotate(180deg) scaleX(1.08) scaleY(1.08) scaleZ(1.08)' },
      { offset: 0.4, 'animation-timing-function': 'cubic-bezier(0.47, 0, 0.745, 0.715)' },
      { offset: 0.6, opacity: 1 },
      { offset: 0.6, transform: 'scaleX(1) scaleY(1) scaleZ(1) rotate(180deg)' },
      { offset: 0.6, 'animation-timing-function': 'cubic-bezier(0.42, 0, 0.58, 1)' },
      { offset: 0.8, opacity: 1 },
      { offset: 0.8, transform: 'scaleX(1.03) scaleY(1.03) scaleZ(1.03) rotate(180deg)' },
      { offset: 0.8, 'animation-timing-function': 'cubic-bezier(0.42, 0, 0.58, 1)' },
      { offset: 1, opacity: 1 },
      { offset: 1, transform: 'scaleX(1) scaleY(1) scaleZ(1) rotate(180deg)' },
      { offset: 1, 'animation-timing-function': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }
    ], 'normal', 'linear');

    const popInLeftText = (el: Element) => AnimationService.createKeyFramedAnimation(el, 1250, 1, [
      { offset: 0, opacity: 0 },
      { offset: 0, transform: 'translateX(-200px) translateY(0px) translateZ(0) scaleX(0.1) scaleY(0.1) scaleZ(0.1)' },
      { offset: 0, 'animation-timing-function': 'cubic-bezier(0.47, 0, 0.745, 0.715)' },
      { offset: 0.4, opacity: 1 },
      { offset: 0.4, transform: 'translateX(0px) translateY(0px) translateZ(0) scaleX(1.08) scaleY(1.08) scaleZ(1.08)' },
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
    ], 'normal', 'linear');
    const popInRightText = (el: Element) => AnimationService.createKeyFramedAnimation(el, 1250, 1, [
      { offset: 0, opacity: 0 },
      { offset: 0, transform: 'translateX(200px) translateY(0px) translateZ(0) scaleX(0.1) scaleY(0.1) scaleZ(0.1)' },
      { offset: 0, 'animation-timing-function': 'cubic-bezier(0.47, 0, 0.745, 0.715)' },
      { offset: 0.4, opacity: 1 },
      { offset: 0.4, transform: 'translateX(0px) translateY(0px) translateZ(0) scaleX(1.08) scaleY(1.08) scaleZ(1.08)' },
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
    ], 'normal', 'linear');

    const splashExitAnimation = AnimationService.createKeyFramedAnimation(this.splash.nativeElement, 1200, 1, [
      { offset: 0, transform: 'translateX(0px) translateY(0px) translateZ(0)'},
      { offset: 0, opacity: 1},
      { offset: 0.4, transform: 'translateX(0px) translateY(-50px) translateZ(0)'},
      { offset: 0.4, opacity: 0.5},
      { offset: 1, transform: 'translateX(0px) translateY(-300px) translateZ(0)'},
      { offset: 1, opacity: 0}
    ], 'normal', 'cubic-bezier', [0.455, 0.03, 0.515, 0.955]);

    const message1Animation = AnimationService.createGroupedAnimations(1, 1250, popInRight(this.message1.nativeElement), popInRightText(this.appName.nativeElement));
    const message2Animation = AnimationService.createGroupedAnimations(1, 1250, popInLeft(this.message2.nativeElement), popInLeftText(this.myName.nativeElement));
    const message3Animation = AnimationService.createGroupedAnimations(1, 1250, popInRight(this.message3.nativeElement), popInRightText(this.course.nativeElement));
    const message4Animation = AnimationService.createGroupedAnimations(1, 1250, popInLeft(this.message4.nativeElement), popInLeftText(this.utn.nativeElement));
    pop1.play();
    await message1Animation.play();
    pop1.play();
    await message2Animation.play();
    pop2.play();
    await message3Animation.play();
    pop3.play();
    await message4Animation.play();
    await splashExitAnimation.play();
    this.destroyComponent.emit();
  }


  ngOnInit() { }

}
