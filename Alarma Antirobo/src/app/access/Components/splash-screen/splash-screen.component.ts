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

  @ViewChild('shield', { static: true }) shield: ElementRef;
  @ViewChild('phone', { static: true }) phone: ElementRef;
  @ViewChild('component', { static: true }) component: ElementRef;
  @ViewChild('text', { static: true }) text: ElementRef;
  @Output() destroyComponent = new EventEmitter<void>();
  constructor(private router: Router) {
    console.log('SPLASH INIT');
  }

  async ngAfterViewInit() {
    try {

      const SHIELD_ANIMATION: Animation = AnimationService.createAnimation
        (this.shield.nativeElement, 700, 1,
          { property: 'opacity', fromValue: 0, toValue: 1 }, 'normal',
          'cubic-bezier', [0.390, 0.575, 0.565, 1.000]);

      const PHONE_ANIMATION: Animation = AnimationService.createKeyFramedAnimation
        (this.phone.nativeElement, 500, 1, [
          { offset: 0, transform: 'scale(2)' },
          { offset: 0, filter: 'blur(4px)' },
          { offset: 0, opacity: 0 },
          { offset: 1, transform: 'scale(1)' },
          { offset: 1, filter: 'blur(0px)' },
          { offset: 1, opacity: 1 }
        ], 'normal', 'cubic-bezier', [0.470, 0.000, 0.745, 0.715])
        .addElement(this.text.nativeElement).afterStyles({ opacity: 1 });

      const SHAKE_ANIMATION: Animation = AnimationService.createKeyFramedAnimation
        (this.shield.nativeElement, 700, 1, [
          { offset: 0, transform: 'translateX(0)' },
          { offset: 0.1, transform: 'translateX(-10px)' },
          { offset: 0.2, transform: 'translateX(10px)' },
          { offset: 0.3, transform: 'translateX(-10px)' },
          { offset: 0.4, transform: 'translateX(10px)' },
          { offset: 0.5, transform: 'translateX(-10px)' },
          { offset: 0.6, transform: 'translateX(10px)' },
          { offset: 0.7, transform: 'translateX(-10px)' },
          { offset: 0.8, transform: 'translateX(8px)' },
          { offset: 0.9, transform: 'translateX(-8px)' },
          { offset: 1, transform: 'translateX(0)' },
        ], 'normal', 'cubic-bezier', [0.455, 0.030, 0.515, 0.955]);

      const COMPONENT_OUT_ANIMATION = AnimationService.createKeyFramedAnimation
        (this.component.nativeElement, 1500, 1, [
          { offset: 0, transform: 'translate3d(0, 0, 0)' },
          { offset: 0, filter: 'blur(0px)' },
          { offset: 0, opacity: 1 },
          { offset: 0, 'animation-timing-function': 'cubic-bezier(0.165, 0.84, 0.44, 1)' },
          { offset: 0.3, transform: 'translate3d(-30px, 0, 0)' },
          { offset: 0.3, 'animation-timing-function': 'cubic-bezier(0.55, 0.055, 0.675, 0.19)' },
          { offset: 0.6, opacity: 1 },
          { offset: 1, opacity: 0 },
          { offset: 1, filter: 'blur(4px)' },
          { offset: 1, transform: 'translate3d(400px, 0, 0)' },
          { offset: 1, 'animation-timing-function': 'cubic-bezier(0.165, 0.84, 0.44, 1)' },
        ], 'normal', 'ease-in-out');

      await AnimationService.playChainedAnimations(SHIELD_ANIMATION, PHONE_ANIMATION, SHAKE_ANIMATION, COMPONENT_OUT_ANIMATION);
      this.destroyComponent.emit();
    } catch (error) {
      console.log(`ANIMATION ERROR: ${error}`);
    }
  }

  ngOnInit() { }

}
