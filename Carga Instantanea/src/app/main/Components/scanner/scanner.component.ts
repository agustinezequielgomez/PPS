import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, AfterContentInit, AfterContentChecked, ChangeDetectorRef } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { DataShareService } from '../../../core/Services/data-share.service';
import { AnimationService } from '../../../core/Services/animation.service';
import { NavController, Animation } from '@ionic/angular';
import { DatabaseService } from '../../../core/Services/database.service';
import { timer, Observable, Subscription } from 'rxjs';
import { DataBaseCollections } from '../../../core/Models/Enums/data-base-collections.enum';
import { User } from '../../../core/Models/Classes/user';
import { StorageService } from '../../../core/Services/storage.service';
import { StorageKeys } from 'src/app/core/Models/Enums/storage-keys.enum';
import { DataBaseDocumentQR, QRCodes, QRCode } from '../../../core/Models/Classes/qrcode';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss'],
})
export class ScannerComponent implements OnInit, AfterViewInit {

  @ViewChild('scanner', {static: true}) scanner: ElementRef;
  @ViewChild('scanBar', {static: true}) scanBar: ElementRef;
  @ViewChild('infoContainer', {static: true}) infoContainer: ElementRef;
  private subscription: Subscription;
  private user: User;
  private animations: Animation[];
  constructor(private qrScanner: QRScanner, private share: DataShareService, public nav: NavController,
              private dataBase: DatabaseService, private storage: StorageService) { }

  async ngOnInit() {
    this.user = await this.storage.getStorage<User>(StorageKeys.USER);
    await this.qrScanner.prepare();
    this.subscription = this.qrScanner.scan().subscribe(this.readQrCode.bind(this));
    await this.qrScanner.show();
  }

  async ngAfterViewInit() {
    const scannerAnimation: Animation = AnimationService.createAnimation(this.scanner.nativeElement, 1000, 1,
      {property: 'background', fromValue: 'rgba(0, 0, 0, 0.459)', toValue: '#1d1d1d'}, 'normal', 'ease-in-out');
    const scanBarAnimation = AnimationService.createAnimation(this.scanBar.nativeElement, 4000, 1,
      {property: 'top', fromValue: '31%', toValue: '65%'}, 'normal', 'cubic-bezier', [.37, -.12, .34, .72])
      .beforeStyles({display: 'block'});
    const infoContainerAnimation = AnimationService.createAnimation(this.infoContainer.nativeElement, 1200, 1,
      {property: 'opacity', fromValue: 0, toValue: 1}, 'normal', 'cubic-bezier', [0.390, 0.575, 0.565, 1.000]);
    this.animations = [scannerAnimation, scanBarAnimation, infoContainerAnimation];
  }

  async readQrCode(code: string) {
    this.subscription.unsubscribe();
    await this.qrScanner.pausePreview();
    console.log('PAUSED');
    try {
      if (this.share.ValidQRCodes.map(x => x.code.trim()).includes(code.trim())) {
        console.log(`VALID ${this.user.role}`);
        if (await this.dataBase.documentExists(DataBaseCollections.carga_instantanea, this.user.email)) {
          const userCredits = (await this.dataBase.getDocumentData<DataBaseDocumentQR>(DataBaseCollections.carga_instantanea,
                                                                                      this.user.email)).redeemedCodes;

          if (userCredits.map(x => x.code.trim()).includes(code.trim())) {
            console.log('EXISTS');
            if (this.user.role === 'admin') {
              console.log('IS ADMIN');
              console.log(`LENGTH OF THE THING U KNOW ${userCredits.filter(x => x.code.trim() === code.trim()).length}`);
              if (userCredits.filter(x => x.code.trim() === code.trim()).length < 2) {
                await this.successCodeReading(code, userCredits);
              } else if (userCredits.filter(x => x.code.trim() === code.trim()).length === 2) {
                this.errorReadingCode('Lo sentimos, pero tenés un límite de 2 cargas por código');
              }
            } else {
              this.errorReadingCode('Lo sentimos, pero ese código ya fue cargado con anterioridad');
            }
          } else {
            console.log('NOT EXISTS');
            await this.successCodeReading(code, userCredits);
          }
        }
      } else {
        this.errorReadingCode('Lo sentimos, pero el código es inválido');
      }
    } catch (error) {
      console.log(`WHA HAPPENED ${error}`);
    }
  }

  async goBack() {
    await this.qrScanner.destroy();
    this.nav.navigateRoot('main', {animationDirection: 'back'});
  }

  errorReadingCode(message: string) {
    AnimationService.playChainedAnimations(...this.animations);
    document.getElementById('message').innerText = message; // 'Lo sentimos, el código ingresado no es válido.';
    document.getElementById('icon').setAttribute('name', 'close-circle-sharp');
    document.getElementById('icon').setAttribute('color', 'danger');
  }

  async successCodeReading(code: string, userCredits: QRCodes) {
    AnimationService.playChainedAnimations(...this.animations);
    const qrCodes: QRCodes = (userCredits !== undefined && userCredits.length > 0) ? userCredits : [];
    this.dataBase.setUpdateDocument<DataBaseDocumentQR>(DataBaseCollections.carga_instantanea, this.user.email,
    {redeemedCodes: [...qrCodes, this.share.ValidQRCodes.find(x => x.code.trim() === code.trim())]});
    document.getElementById('message').innerText = `!Se acaban de acreditar ${this.share.ValidQRCodes.find(x => x.code.trim() === code.trim()).value} en tu cuenta!.`;
    document.getElementById('icon').setAttribute('name', 'checkmark-circle-sharp');
    document.getElementById('icon').setAttribute('color', 'primary');
  }
}
