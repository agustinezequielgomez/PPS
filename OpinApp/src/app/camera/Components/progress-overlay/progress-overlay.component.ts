import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { DataShareService } from '../../../core/Services/data-share.service';
import { AnimationService } from '../../../core/Services/animation.service';
import { Animation, NavController } from '@ionic/angular';
import { empty, interval, Observable, timer } from 'rxjs';
import { expand, takeUntil, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-progress-overlay',
  templateUrl: './progress-overlay.component.html',
  styleUrls: ['./progress-overlay.component.scss'],
})
export class ProgressOverlayComponent implements OnInit, AfterViewInit {

  public color: 'primary' | 'accent' | 'warn' = 'accent';
  public mode: ProgressSpinnerMode = 'indeterminate';
  public strokeWidth: number = 20; // 122 20
  public diameter: number = 200; // 200
  public value = 0;
  private iconAnimation: Animation;
  private textAnimation: Animation;
  private buttonAnimation: Animation;
  @ViewChild('ionIcon', {static: true}) icon: any;
  @ViewChild('text', {static: true}) tetx: any;
  @ViewChild('button', {static: true}) button: any;
  constructor(private share: DataShareService, public nav: NavController) { }

  async ngOnInit() {
    timer(1500).subscribe(() => this.share.UploadPhotosStatus = 'success');
    this.share.UploadPhotosStatusObservable.subscribe(async (value) => {
      if (value === 'success') {
        this.mode = 'determinate';
        interval(5).pipe(takeWhile(data => this.value < 100)).subscribe(() => {
          this.value += 2;
        });
        timer(700).subscribe(() => {
        interval(5).pipe(takeWhile(data => this.strokeWidth < 122)).subscribe(() => {
          this.strokeWidth += 2;
        });
      });
        this.color = 'primary';
        await this.iconAnimation.delay(1000).play();
        await this.textAnimation.play();
        await this.buttonAnimation.play();
      }
    });
  }

  async ngAfterViewInit() {
    this.iconAnimation = AnimationService.createKeyFramedAnimation(this.icon.el, 700, 1, [
      { offset: 0, transform: 'scale(0.5)'},
      { offset: 0, opacity: 0},
      { offset: 1, transform: 'scale(1)'},
      { offset: 1, opacity: 1},
    ], 'normal', 'cubic-bezier', [0.390, 0.575, 0.565, 1.000]).beforeStyles({display: 'block'});
    this.textAnimation = AnimationService.createAnimation(this.tetx.nativeElement, 900, 1,
      {property: 'opacity', fromValue: 0, toValue: 1}, 'normal', 'ease-in-out').beforeStyles({display: 'block'});
    this.buttonAnimation = AnimationService.createKeyFramedAnimation(this.button.el, 600, 1, [
      { offset: 0, transform: 'scaleY(0.4)' },
      { offset: 0, 'transform-origin': '100% 0%' },
      { offset: 1, transform: 'scaleY(1)' },
      { offset: 1, 'transform-origin': '100% 0%' }
    ], 'normal', 'cubic-bezier', [0.390, 0.575, 0.565, 1.000]).beforeStyles({display: 'block'});
  }

}
