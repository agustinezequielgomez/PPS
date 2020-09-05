import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TestUsers, TestUser } from '../Models/Classes/test-user';
import { CardsData } from '../Models/Interfaces/cards-data';
import { Languages } from '../Models/Enums/languages.enum';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {

  constructor() { }

  //#region Subjects
  private FullScreen: BehaviorSubject<boolean> = new BehaviorSubject(null);
  private TestUserSubject: BehaviorSubject<TestUser> = new BehaviorSubject(null);
  //#endregion

  //#region Observables
  public TestUserObservable: Observable<TestUser> = this.TestUserSubject.asObservable();
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

  public GetNumbers(currentLanguage: Languages): CardsData {
    return [
      {cardId: 'five', imgPath: 'assets/numbers/five.png', audioPath: `assets/numbers/sounds/${currentLanguage}/five.m4a`},
      {cardId: 'four', imgPath: 'assets/numbers/four.png', audioPath: `assets/numbers/sounds/${currentLanguage}/four.m4a`},
      {cardId: 'nine', imgPath: 'assets/numbers/nine.png', audioPath: `assets/numbers/sounds/${currentLanguage}/nine.m4a`},
      {cardId: 'hipo', imgPath: 'assets/numbers/seven.png', audioPath: `assets/numbers/sounds/${currentLanguage}/seven.m4a`},
      {cardId: 'three', imgPath: 'assets/numbers/three.png', audioPath: `assets/numbers/sounds/${currentLanguage}/three.m4a`},
      {cardId: 'two', imgPath: 'assets/numbers/two.png', audioPath: `assets/numbers/sounds/${currentLanguage}/two.m4a`}
    ];
  }

  public GetAnimals(currentLanguage: Languages): CardsData {
    return [
      {cardId: 'cebra', imgPath: 'assets/animals/cebra.png', audioPath: `assets/animals/sounds/${currentLanguage}/cebra.m4a`},
      {cardId: 'green', imgPath: 'assets/animals/coco.png', audioPath: `assets/animals/sounds/${currentLanguage}/coco.m4a`},
      {cardId: 'elefante', imgPath: 'assets/animals/elefante.png', audioPath: `assets/animals/sounds/${currentLanguage}/elefante.m4a`},
      {cardId: 'hipo', imgPath: 'assets/animals/hipo.png', audioPath: `assets/animals/sounds/${currentLanguage}/hipo.m4a`},
      {cardId: 'jirafa', imgPath: 'assets/animals/jirafa.png', audioPath: `assets/animals/sounds/${currentLanguage}/jirafa.m4a`},
      {cardId: 'leon', imgPath: 'assets/animals/leon.png', audioPath: `assets/animals/sounds/${currentLanguage}/leon.m4a`}
    ];
  }

  public GetColors(currentLanguage: Languages): CardsData {
    return [
      {cardId: 'blue', imgPath: 'assets/colors/blue.png', audioPath: `assets/colors/sounds/${currentLanguage}/blue.m4a`},
      {cardId: 'green', imgPath: 'assets/colors/green.png', audioPath: `assets/colors/sounds/${currentLanguage}/green.m4a`},
      {cardId: 'orange', imgPath: 'assets/colors/orange.png', audioPath: `assets/colors/sounds/${currentLanguage}/orange.m4a`},
      {cardId: 'purple', imgPath: 'assets/colors/purple.png', audioPath: `assets/colors/sounds/${currentLanguage}/purple.m4a`},
      {cardId: 'red', imgPath: 'assets/colors/red.png', audioPath: `assets/colors/sounds/${currentLanguage}/red.m4a`},
      {cardId: 'yellow', imgPath: 'assets/colors/yellow.png', audioPath: `assets/colors/sounds/${currentLanguage}/yellow.m4a`}
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
  //#endregion
}
