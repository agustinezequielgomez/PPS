import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationService } from '../../../core/Services/animation.service';
import { Animation } from '@ionic/angular';
import { interval } from 'rxjs';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss'],
})
export class SplashScreenComponent implements OnInit, AfterViewInit {

  @Output() destroyComponent = new EventEmitter<void>();
  @ViewChild('leftFlag', {static: true}) leftFlag: ElementRef;
  @ViewChild('tortuga', {static: true}) tortuga: ElementRef;
  @ViewChild('loro', {static: true}) loro: ElementRef;
  @ViewChild('middleFlag', {static: true}) middleFlag: ElementRef;
  @ViewChild('jirafa', {static: true}) jirafa: ElementRef;
  @ViewChild('rightFlag', {static: true}) rightFlag: ElementRef;
  @ViewChild('leon', {static: true}) leon: ElementRef;
  @ViewChild('component', {static: true}) component: ElementRef;
  constructor(private router: Router) {
  }

   async ngAfterViewInit() {
     console.log(this.leftFlag.nativeElement);
     const leftAnimation = (AnimationService.createKeyFramedAnimation(this.leftFlag.nativeElement,
      2000, 1, [
        { offset: 0, transform: 'rotateY(-100deg)'},
        { offset: 0, 'transform-origin': 'right'},
        { offset: 0, opacity: 0},
        { offset: 1, transform: 'rotateY(0deg)'},
        { offset: 1, 'transform-origin': 'right'},
        { offset: 1, opacity: 1},
      ], 'normal', 'cubic-bezier', [0.175, 0.885, 0.320, 1.275]))
      .addElement(this.tortuga.nativeElement).addElement(this.loro.nativeElement).delay(500);

     const middleAnimation = (AnimationService.createKeyFramedAnimation(this.middleFlag.nativeElement,
      2000, 1, [
        { offset: 0, transform: 'rotateX(70deg)'},
        { offset: 0, 'transform-origin': 'top'},
        { offset: 0, opacity: 0},
        { offset: 1, transform: 'rotateX(0)'},
        { offset: 1, 'transform-origin': 'top'},
        { offset: 1, opacity: 1},
      ], 'normal', 'cubic-bezier', [0.175, 0.885, 0.320, 1.275]))
      .addElement(this.jirafa.nativeElement).delay(750);

     const rightAnimation = (AnimationService.createKeyFramedAnimation(this.rightFlag.nativeElement,
        1500, 1, [
          { offset: 0, transform: 'rotateY(70deg)'},
          { offset: 0, 'transform-origin': 'right'},
          { offset: 0, opacity: 0},
          { offset: 1, transform: 'rotateY(0)'},
          { offset: 1, 'transform-origin': 'right'},
          { offset: 1, opacity: 1},
        ], 'normal', 'cubic-bezier', [0.175, 0.885, 0.320, 1.275]))
        .addElement(this.leon.nativeElement).delay(1000);
     const flagAnimations = AnimationService.createGroupedAnimations(0, 1, leftAnimation, middleAnimation, rightAnimation);
     const componentExitAnimation = AnimationService.createKeyFramedAnimation(this.component.nativeElement, 900, 1, [
       { offset: 0, transform: 'rotateY(0)' },
       { offset: 0, 'transform-origin': 'right' },
       { offset: 0, opacity: 1 },
       { offset: 1, transform: 'rotateY(70deg)' },
       { offset: 1, 'transform-origin': 'right' },
       { offset: 1, opacity: 0 }
     ], 'normal', 'cubic-bezier', [0.600, -0.280, 0.735, 0.045]);
     await AnimationService.playChainedAnimations(flagAnimations, componentExitAnimation);
     this.destroyComponent.emit();
  }


  ngOnInit() {}

}
