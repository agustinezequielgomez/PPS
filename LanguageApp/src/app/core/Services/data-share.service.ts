import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TestUsers, TestUser } from '../Models/Classes/test-user';
import { CardsData } from '../Models/Interfaces/cards-data';
import { Languages } from '../Models/Enums/languages.enum';
import { Elements } from '../Models/Enums/elements.enum';
import { AnimationService } from './animation.service';
import { LoginAnimations } from '../Models/Enums/login-animations.enum';
import { Animation } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {

  constructor() { }

  //#region Subjects
  private FullScreen: BehaviorSubject<boolean> = new BehaviorSubject(null);
  private TestUserSubject: BehaviorSubject<TestUser> = new BehaviorSubject(null);
  private LanguageObservable: BehaviorSubject<Languages> = new BehaviorSubject(Languages.SPANISH);
  private ElementsObservable: BehaviorSubject<Elements> = new BehaviorSubject(Elements.COLORS);
  private FlagObservable: BehaviorSubject<string> = new BehaviorSubject('assets/flags/argentina.png');
  private ElementsPathObservable: BehaviorSubject<string> = new BehaviorSubject('assets/colors/green.png');
  private CardsDataSubject: BehaviorSubject<CardsData> = new BehaviorSubject(this.Colors);
  //#endregion

  //#region Observables
  public TestUserObservable: Observable<TestUser> = this.TestUserSubject.asObservable();
  public CurrentFlag: Observable<string> = this.FlagObservable.asObservable();
  public CurrentElementImg: Observable<string> = this.ElementsPathObservable.asObservable();
  public CardsDataObservable: Observable<CardsData> = this.CardsDataSubject.asObservable();
  //#endregion

  //#region Properties
  public get IsFullScreen(): boolean {
    return this.FullScreen.value;
  }

  public set SetFullScreen(value: boolean) {
    this.FullScreen.next(value);
  }

  public get TestUser(): TestUser {
    return this.TestUserSubject.value;
  }
  public set TestUser(user: TestUser) {
    this.TestUserSubject.next(user);
  }

  public get CurrentLanguage(): Languages {
    return this.LanguageObservable.value;
  }

  public set CurrentLanguage(nextLanguage: Languages) {
    if (nextLanguage !== this.LanguageObservable.value) {
      this.LanguageObservable.next(nextLanguage);
      this.CurrentElement = this.ElementsObservable.value;
      switch (nextLanguage) {
        case Languages.SPANISH:
          this.FlagObservable.next('assets/flags/argentina.png');
          break;
        case Languages.PORTUGUESE:
          this.FlagObservable.next('assets/flags/brasil.png');
          break;
        case Languages.ENGLISH:
          this.FlagObservable.next('assets/flags/england.png');
          break;
        default:
          this.FlagObservable.next('assets/flags/argentina.png');
          break;
      }
    }
  }

  public get CurrentElement(): Elements {
    return this.ElementsObservable.value;
  }

  public set CurrentElement(nextElement: Elements) {
    // if (this.CurrentElement !== nextElement) {
      this.ElementsObservable.next(nextElement);
      switch (nextElement) {
        case Elements.ANIMALS:
          this.ElementsPathObservable.next('assets/animals/leon.png');
          this.CardsDataSubject.next(this.Animals);
          break;
        case Elements.COLORS:
          this.ElementsPathObservable.next('assets/colors/blue.png');
          this.CardsDataSubject.next(this.Colors);
          break;
        case Elements.NUMBERS:
          this.ElementsPathObservable.next('assets/numbers/one.png');
          this.CardsDataSubject.next(this.Numbers);
          break;
        default:
          this.ElementsPathObservable.next('assets/animals/leon.png');
          break;
      // }
    }
  }

  public get Numbers(): CardsData {
    return [
      {cardId: 'five', imgPath: 'assets/numbers/five.png', audioPath: `assets/numbers/sounds/${this.CurrentLanguage}/five.m4a`},
      {cardId: 'four', imgPath: 'assets/numbers/four.png', audioPath: `assets/numbers/sounds/${this.CurrentLanguage}/four.m4a`},
      {cardId: 'nine', imgPath: 'assets/numbers/nine.png', audioPath: `assets/numbers/sounds/${this.CurrentLanguage}/nine.m4a`},
      {cardId: 'hipo', imgPath: 'assets/numbers/seven.png', audioPath: `assets/numbers/sounds/${this.CurrentLanguage}/seven.m4a`},
      {cardId: 'three', imgPath: 'assets/numbers/three.png', audioPath: `assets/numbers/sounds/${this.CurrentLanguage}/three.m4a`},
      {cardId: 'two', imgPath: 'assets/numbers/two.png', audioPath: `assets/numbers/sounds/${this.CurrentLanguage}/two.m4a`},
      {cardId: 'eight', imgPath: 'assets/numbers/eight.png', audioPath: `assets/numbers/sounds/${this.CurrentLanguage}/two.m4a`},
      {cardId: 'one', imgPath: 'assets/numbers/one.png', audioPath: `assets/numbers/sounds/${this.CurrentLanguage}/two.m4a`}
    ];
  }

  public get Animals(): CardsData {
    return [
      {cardId: 'cebra', imgPath: 'assets/animals/cebra.png', audioPath: `assets/animals/sounds/${this.CurrentLanguage}/cebra.m4a`},
      {cardId: 'coco', imgPath: 'assets/animals/coco.png', audioPath: `assets/animals/sounds/${this.CurrentLanguage}/coco.m4a`},
      {cardId: 'elefante', imgPath: 'assets/animals/elefante.png', audioPath: `assets/animals/sounds/${this.CurrentLanguage}/elefante.m4a`},
      {cardId: 'hipo', imgPath: 'assets/animals/hipo.png', audioPath: `assets/animals/sounds/${this.CurrentLanguage}/hipo.m4a`},
      {cardId: 'jirafa', imgPath: 'assets/animals/jirafa.png', audioPath: `assets/animals/sounds/${this.CurrentLanguage}/jirafa.m4a`},
      {cardId: 'leon', imgPath: 'assets/animals/leon.png', audioPath: `assets/animals/sounds/${this.CurrentLanguage}/leon.m4a`},
      {cardId: 'loro', imgPath: 'assets/animals/loro.png', audioPath: `assets/animals/sounds/${this.CurrentLanguage}/cebra.m4a`},
      {cardId: 'niandu', imgPath: 'assets/animals/niandu.png', audioPath: `assets/animals/sounds/${this.CurrentLanguage}/coco.m4a`},
    ];
  }

  public get Colors(): CardsData {
    return [
      {cardId: 'blue', imgPath: 'assets/colors/blue.png', audioPath: `assets/colors/sounds/${this.CurrentLanguage}/blue.m4a`},
      {cardId: 'green', imgPath: 'assets/colors/green.png', audioPath: `assets/colors/sounds/${this.CurrentLanguage}/green.m4a`},
      {cardId: 'orange', imgPath: 'assets/colors/orange.png', audioPath: `assets/colors/sounds/${this.CurrentLanguage}/orange.m4a`},
      {cardId: 'purple', imgPath: 'assets/colors/purple.png', audioPath: `assets/colors/sounds/${this.CurrentLanguage}/purple.m4a`},
      {cardId: 'red', imgPath: 'assets/colors/red.png', audioPath: `assets/colors/sounds/${this.CurrentLanguage}/red.m4a`},
      {cardId: 'yellow', imgPath: 'assets/colors/yellow.png', audioPath: `assets/colors/sounds/${this.CurrentLanguage}/yellow.m4a`},
      {cardId: 'brown', imgPath: 'assets/colors/brown.png', audioPath: `assets/colors/sounds/${this.CurrentLanguage}/red.m4a`},
      {cardId: 'pink', imgPath: 'assets/colors/pink.png', audioPath: `assets/colors/sounds/${this.CurrentLanguage}/yellow.m4a`}
    ];
  }

  public get FlagImgPaths(): {path: string, language: Languages}[] {
    return [
      {path: 'assets/flags/argentina.png', language: Languages.SPANISH},
      {path: 'assets/flags/brasil.png', language: Languages.PORTUGUESE},
      {path: 'assets/flags/england.png', language: Languages.ENGLISH}
    ];
  }

  public get ElementsImgPaths(): {path: string, element: Elements}[] {
    return [
      {path: 'assets/colors/green.png', element: Elements.COLORS},
      {path: 'assets/numbers/one.png', element: Elements.NUMBERS},
      {path: 'assets/animals/leon.png', element: Elements.ANIMALS}
    ];
  }

  public get TestUsers(): TestUsers {
    return [
      {id: 1, correo: 'admin@admin.com', clave: 111111, perfil: 'admin', sexo: 'femenino'},
      {id: 2, correo: 'invitado@invitado.com', clave: 222222, perfil: 'invitado', sexo: 'femenino'},
      {id: 3, correo: 'usuario@usuario.com', clave: 333333, perfil: 'usuario', sexo: 'masculino'},
      {id: 4, correo: 'anonimo@anonimo.com', clave: 444444, perfil: 'usuario', sexo: 'masculino'},
      {id: 5, correo: 'tester@tester.com', clave: 555555, perfil: 'tester', sexo: 'femenino'}
    ];
  }

  private topRightCorner(img: Element): { position: LoginAnimations, animation: Animation } {
    const daAnimation = (AnimationService.createKeyFramedAnimation(img, 7000, 1, [
      {offset: 0.01, bottom: '103%'},
      { offset: 0.15, bottom: '75%'},
      { offset: 0.85, bottom: '75%'},
      { offset: 1, bottom: '120%'}
    ], 'normal', 'ease-in')).beforeStyles({ display: 'block'});

    return { position: LoginAnimations.TOP_RIGHT_CORNER, animation: daAnimation };
  }

  private topLeftCorner(img: Element): { position: LoginAnimations, animation: Animation } {
    const daAnimation = (AnimationService.createKeyFramedAnimation(img, 7000, 1, [
      {offset: 0.01, bottom: '93%'},
      { offset: 0.15, bottom: '76%'},
      { offset: 0.85, bottom: '76%'},
      { offset: 1, bottom: '100%'}
    ], 'normal', 'ease-in')).beforeStyles({ display: 'block'});

    return { position: LoginAnimations.TOP_LEFT_CORNER, animation: daAnimation };
  }

  private middleLeft(img: Element): { position: LoginAnimations, animation: Animation } {
    const daAnimation = (AnimationService.createKeyFramedAnimation(img, 7000, 1, [
      {offset: 0.01, right: '91%'},
      { offset: 0.15, right: '55%'},
      { offset: 0.85, right: '55%'},
      { offset: 1, right: '100%'}
    ], 'normal', 'ease-in')).beforeStyles({ display: 'block'});

    return { position: LoginAnimations.MIDDLE_LEFT, animation: daAnimation };
  }

  private bottomLeftCorner(img: Element): { position: LoginAnimations, animation: Animation } {
    const daAnimation = (AnimationService.createKeyFramedAnimation(img, 7000, 1, [
      {offset: 0.01, top: '101%'},
      { offset: 0.15, top: '74%'},
      { offset: 0.85, top: '74%'},
      { offset: 1, top: '120%'}
    ], 'normal', 'ease-in')).beforeStyles({ display: 'block'});

    return { position: LoginAnimations.BOTTOM_LEFT_CORNER, animation: daAnimation };
  }

  private bottomRightCorner(img: Element): { position: LoginAnimations, animation: Animation } {
    const daAnimation = (AnimationService.createKeyFramedAnimation(img, 7000, 1, [
      {offset: 0.01, top: '92%'},
      { offset: 0.15, top: '74%'},
      { offset: 0.85, top: '74%'},
      { offset: 1, top: '105%'}
    ], 'normal', 'ease-in')).beforeStyles({ display: 'block'});

    return { position: LoginAnimations.BOTTOM_RIGHT_CORNER, animation: daAnimation };
  }

  public getLoginAnimation(img: Element): { position: LoginAnimations, animation: Animation} {
    const animations: { position: LoginAnimations, animation: Animation}[] = [
      this.topRightCorner(img),
      this.topLeftCorner(img),
      this.middleLeft(img),
      this.bottomLeftCorner(img),
      this.bottomRightCorner(img)
    ];

    return animations[Math.floor(Math.random() * animations.length)];
  }
  //#endregion
}
