import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationService } from '../../../core/Services/animation.service';
import { Animation } from '@ionic/angular';
import { AudioService } from '../../../core/Services/audio.service';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss'],
})
export class SplashScreenComponent implements OnInit, AfterViewInit {

  @ViewChild('edificioBien') edificioBien: ElementRef;
  @ViewChild('edificioMal') edificioMal: ElementRef;
  @ViewChild('splash') splash: ElementRef;
  @ViewChild('flash') flash: ElementRef;
  public displayCompleteBuilding = false;
  @Output() destroyComponent = new EventEmitter<void>();
  constructor(private audio: AudioService) { }

   async ngAfterViewInit() {
    const audio = new Audio('assets/sounds/flash.flac');
    audio.load();
    const niceBuildingAnimation = AnimationService.createKeyFramedAnimation(this.edificioBien.nativeElement, 800, 1, [
      { offset: 0, transform: 'translateX(-100px)'},
      { offset: 0, filter: 'blur(10px)'},
      { offset: 0, opacity: 0 },
      { offset: 1, transform: 'translateX(82px)'},
      { offset: 1, filter: 'blur(0)'},
      { offset: 1, opacity: 1 }
    ], 'normal', 'cubic-bezier', [0.250, 0.460, 0.450, 0.940]);
    const badBuildingAnimation = AnimationService.createKeyFramedAnimation(this.edificioMal.nativeElement, 800, 1, [
      { offset: 0, transform: 'translateX(100px)'},
      { offset: 0, filter: 'blur(10px)'},
      { offset: 0, opacity: 0 },
      { offset: 1, transform: 'translateX(-80px)'},
      { offset: 1, filter: 'blur(0)'},
      { offset: 1, opacity: 1 }
    ], 'normal', 'cubic-bezier', [0.250, 0.460, 0.450, 0.940]);
    const flashAnimation = AnimationService.createKeyFramedAnimation(this.flash.nativeElement, 800, 1, [
      {offset: 0, opacity: 1},
      {offset: 1, opacity: 0}
    ], 'normal', 'ease-in-out');
    const splashOut = AnimationService.createKeyFramedAnimation(this.splash.nativeElement, 450, 1, [
      {offset: 0, transform: 'rotateX(0)'},
      {offset: 0, opacity: 1},
      {offset: 1, transform: 'rotateX(70deg)'},
      {offset: 1, opacity: 0}
    ], 'normal', 'cubic-bezier', [0.550, 0.085, 0.680, 0.530]).delay(1500);
    await AnimationService.createGroupedAnimations(800, 1, niceBuildingAnimation, badBuildingAnimation).delay(1500).play();
    this.displayCompleteBuilding = true;
    await audio.play();
    await flashAnimation.play();
    await splashOut.play()
    this.destroyComponent.emit();
  }


  async ngOnInit() { }

}
