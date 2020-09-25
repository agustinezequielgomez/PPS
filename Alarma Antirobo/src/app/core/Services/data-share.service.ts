import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TestUsers, TestUser } from '../Models/Classes/test-user';
import { ScreenOrientation } from '../Models/Enums/screen-orientation.enum';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {

  constructor() { }

  //#region Subjects
  private FullScreen: BehaviorSubject<boolean> = new BehaviorSubject(null);
  private TestUserSubject: BehaviorSubject<TestUser> = new BehaviorSubject(null);
  private ScreenOrientationSubject: BehaviorSubject<ScreenOrientation> = new BehaviorSubject(null);
  private CurrentlyPlayingFileSubject: BehaviorSubject<string> = new BehaviorSubject(null);
  //#endregion

  //#region Observables
  public TestUserObservable: Observable<TestUser> = this.TestUserSubject.asObservable();
  public ScreenOrientationObservable: Observable<ScreenOrientation> = this.ScreenOrientationSubject.asObservable();
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

  public set ScreenOrientation(value: ScreenOrientation) {
    if (value !== this.ScreenOrientationSubject.value) {
      this.ScreenOrientationSubject.next(value);
    }
  }

  public get ScreenOrientation(): ScreenOrientation {
    return this.ScreenOrientationSubject.value;
  }

  public get CurrentlyPlayingFile(): string {
    return this.CurrentlyPlayingFileSubject.value;
  }


  public set CurrentlyPlayingFile(value: string) {
    this.CurrentlyPlayingFileSubject.next(value);
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
