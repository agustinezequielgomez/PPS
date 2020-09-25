import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Photo, Photos } from '../Models/Classes/photo';
import { SideMenuItems } from '../Models/Classes/side-menu-item';
import { TestUsers, TestUser } from '../Models/Classes/test-user';
import { BuildingAspect } from '../Models/Enums/building-aspect.enum';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {

  constructor() { }

  //#region Subjects
  private FullScreen: BehaviorSubject<boolean> = new BehaviorSubject(null);
  private TestUserSubject: BehaviorSubject<TestUser> = new BehaviorSubject(null);
  private DisplayMenuHeaderSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private RecentlyCapturedPhotosSubject: BehaviorSubject<Photos> = new BehaviorSubject([]);
  private SelectedBuildingAspectSubject: BehaviorSubject<BuildingAspect> = new BehaviorSubject(null);
  private UploadPhotosStatusSubject: BehaviorSubject<'success' | 'error'> = new BehaviorSubject(null);
  private RegisterVoteSubject: BehaviorSubject<string> = new BehaviorSubject(null);
  //#endregion

  //#region Observables
  public TestUserObservable: Observable<TestUser> = this.TestUserSubject.asObservable();
  public DisplayMenuObservable: Observable<boolean> = this.DisplayMenuHeaderSubject.asObservable();
  public RecentlyCapturedPhotosObservable: Observable<Photos> = this.RecentlyCapturedPhotosSubject.asObservable();
  public UploadPhotosStatusObservable: Observable<'success' | 'error'> = this.UploadPhotosStatusSubject.asObservable();
  public RegisterVoteObservable: BehaviorSubject<string> = new BehaviorSubject(null);
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

  public set DisplayMenuHeader(value: boolean) {
    this.DisplayMenuHeaderSubject.next(value);
  }

  public get DisplayMenuHeader(): boolean {
    return this.DisplayMenuHeaderSubject.value;
  }

  public set RecentlyCapturedPhotos(value: Photos) {
    this.RecentlyCapturedPhotosSubject.next([...value]);
  }

  public get RecentlyCapturedPhotos(): Photos {
    return this.RecentlyCapturedPhotosSubject.value;
  }

  public get SelectedBuildingAspect(): BuildingAspect {
    return this.SelectedBuildingAspectSubject.value;
  }

  public set SelectedBuildingAspect(value: BuildingAspect) {
    this.SelectedBuildingAspectSubject.next(value);
  }

  public set UploadPhotosStatus(value: 'success' | 'error') {
    this.UploadPhotosStatusSubject.next(value);
  }

  public get SideMenuItems(): SideMenuItems {
    return [
      {
        id: 0,
        label: 'Inicio',
        href: '/main',
        icon: 'home-sharp'
      },
      {
        id: 1,
        label: 'Mis fotos',
        href: '/results',
        icon: 'images-sharp'
      },
      {
        id: 2,
        label: 'Fotos lindas',
        href: 'allPictures',
        icon: 'thumbs-up-sharp'
      },
      {
        id: 3,
        label: 'Fotos feas',
        href: 'allPictures',
        icon: 'thumbs-down-sharp'
      },
      {
        id: 4,
        label: 'Resultados fotos lindas',
        href: '/pie-chart',
        icon: 'pie-chart-sharp'
      },
      {
        id: 5,
        label: 'Resultados fotos feas',
        href: '/bar-chart',
        icon: 'bar-chart-sharp'
      },
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
