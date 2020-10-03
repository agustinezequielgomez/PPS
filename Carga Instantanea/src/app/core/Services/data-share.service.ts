import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { QRCodes } from '../Models/Classes/qrcode';
import { TestUsers, TestUser } from '../Models/Classes/test-user';

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

  public get TestUsers(): TestUsers {
    return [
      {id: 1, correo: 'admin@admin.com', clave: 111111, perfil: 'admin', sexo: 'femenino'},
      {id: 2, correo: 'invitado@invitado.com', clave: 222222, perfil: 'invitado', sexo: 'femenino'},
      {id: 3, correo: 'usuario@usuario.com', clave: 333333, perfil: 'usuario', sexo: 'masculino'},
      {id: 4, correo: 'anonimo@anonimo.com', clave: 444444, perfil: 'usuario', sexo: 'masculino'},
      {id: 5, correo: 'tester@tester.com', clave: 555555, perfil: 'tester', sexo: 'femenino'}
    ];
  }
  public get ValidQRCodes(): QRCodes {
    return [
      { code: '8c95def646b6127282ed50454b73240300dccabc', value: 10 },
      { code: 'ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172', value: 50 },
      { code: '2786f4877b9091dcad7f35751bfcf5d5ea712b2f', value: 100 }
    ];
  }
  //#endregion
}
