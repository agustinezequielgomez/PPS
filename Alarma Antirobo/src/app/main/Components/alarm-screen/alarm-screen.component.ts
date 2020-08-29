import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { Flashlight } from '@ionic-native/flashlight';
import { Vibration } from '@ionic-native/vibration';
import { timer } from 'rxjs';
import { ScreenOrientation } from 'src/app/core/Models/Enums/screen-orientation.enum';
import { AnimationService } from '../../../core/Services/animation.service';
import { AudioService } from '../../../core/Services/audio.service';
import { ComponentCreatorService } from '../../../core/Services/component-creator.service';
import { DataShareService } from '../../../core/Services/data-share.service';
import { GyroscopeService } from '../../../core/Services/gyroscope.service';
import { PasswordModalComponent } from '../password-modal/password-modal.component';
const { Haptics } = Plugins;

@Component({
  selector: 'app-alarm-screen',
  templateUrl: './alarm-screen.component.html',
  styleUrls: ['./alarm-screen.component.scss'],
})
export class AlarmScreenComponent implements OnInit {

  private currentFileId: string = null;
  public displayAlert = false;
  @ViewChild('alert', { static: true }) alert: ElementRef;
  public state: { active: boolean, buttonText: 'Activar' | 'Desactivar' } = { active: false, buttonText: 'Activar' };
  constructor(private gyro: GyroscopeService, private share: DataShareService, private audio: AudioService,
              private creator: ComponentCreatorService) { }

  async ngOnInit() {
   }

  async toggleDeviceOrientation() {
    try {
      if (!this.state.active) {
        if (await this.gyro.startGyroscopeWatch()) {
          this.state = { active: true, buttonText: 'Desactivar' };
          this.share.ScreenOrientationObservable.subscribe(async orientation => {
            if (this.share.CurrentlyPlayingFile !== null) {
              await this.cleanStatus();
            }
            switch (orientation) {
              case ScreenOrientation.Horizontal:
                this.share.CurrentlyPlayingFile = 'horizontal';
                await this.audio.preloadFile(this.share.CurrentlyPlayingFile, 'audio', 'AAA.m4a');
                await this.audio.playAudioFile(this.share.CurrentlyPlayingFile);
                Vibration.vibrate(3000);
                break;

              case ScreenOrientation.Vertical:
                this.share.CurrentlyPlayingFile = 'vertical';
                await this.audio.preloadFile(this.share.CurrentlyPlayingFile, 'audio', 'AIUDA.m4a');
                await this.audio.playAudioFile(this.share.CurrentlyPlayingFile);
                await Flashlight.switchOn();
                timer(5000).subscribe(async () => await Flashlight.switchOff());
                break;
              case ScreenOrientation.LeftTilt:
                this.share.CurrentlyPlayingFile = 'leftTilt';
                await this.audio.preloadFile(this.share.CurrentlyPlayingFile, 'audio', 'AUXILIO.m4a');
                await this.audio.playAudioFile(this.share.CurrentlyPlayingFile);
                break;
              case ScreenOrientation.RightTilt:
                this.share.CurrentlyPlayingFile = 'rightTilt';
                await this.audio.preloadFile(this.share.CurrentlyPlayingFile, 'audio', 'SOS.m4a');
                await this.audio.playAudioFile(this.share.CurrentlyPlayingFile);
                break;
            }
          });
        } else {
          await this.openAlert();
        }
      } else {
        if (await this.creator.createPopOver<boolean>(PasswordModalComponent, 'ios', false, 'disableAlarmPopover')) {
          this.state = { active: false, buttonText: 'Activar' };
          this.cleanStatus();
          this.gyro.stopGyroscopeWatch();
        }
      }
    } catch (error) {
      console.log(`ALARM SCREEN ERROR ${error}`);
    }
  }

  private async cleanStatus() {
    Vibration.vibrate(0);
    this.audio.unload(this.share.CurrentlyPlayingFile);
    if (Flashlight.isSwitchedOn()) {
      await Flashlight.switchOff();
    }
  }

  async openAlert() {
    const openAnimation = await AnimationService.createAnimation(this.alert.nativeElement, 1000, 1,
      { property: 'opacity', fromValue: 0, toValue: 1 }, 'normal', 'cubic-bezier', [0.455, 0.03, 0.515, 0.955])
      .beforeStyles({ opacity: 0 })
      .beforeStyles({ display: 'grid' });
    await openAnimation.play();
  }

  async closeAlert() {
    await (await AnimationService.createAnimation(this.alert.nativeElement, 1000, 1,
      { property: 'opacity', fromValue: 1, toValue: 0 }, 'normal', 'cubic-bezier', [0.455, 0.03, 0.515, 0.955])
      .afterStyles({ display: 'none' })).play();
  }
}
