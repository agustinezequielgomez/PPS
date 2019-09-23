import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private assetsBasePath = '../../assets';
  private languages: any[] = [{language: 'spanish', path: `${this.assetsBasePath}/flags/argentina.png`},
          {language: 'english', path: `${this.assetsBasePath}/flags/england.png`},
          {language: 'portuguese', path: `${this.assetsBasePath}/flags/brasil.png`}];

  private elements: any[] = [{element: 'animals', path: `${this.assetsBasePath}/animals/leon.png`},
          {element: 'numbers', path: `${this.assetsBasePath}/numbers/two.png`},
          {element: 'colors', path: `${this.assetsBasePath}/colors/blue.png`}];

  private users: any[]  = [{nombre: 'admin', mail: 'admin@admin.com', clave: '111111'},
  {nombre: 'invitado', mail: 'invitado@invitado.com', clave: '222222'},
  {nombre: 'usuario', mail: 'usuario@usuario.com', clave: '333333'}, {nombre: 'anonimo', mail: 'anonimo@anonimo.com', clave: '444444'},
  {nombre: 'tester', mail: 'tester@tester.com', clave: '555555'}];

  private animateImgBackground: string[] = ['../../assets/animals/cebra.png',
  '../../assets/animals/coco.png', '../../assets/animals/elefante.png',
  '../../assets/animals/hipopotamo.png', '../../assets/animals/jirafa.png', '../../assets/animals/loro.png',
  '../../assets/animals/leon.png', , '../../assets/animals/niandu.png'];

  private classes: string[] = ['left-right', 'top-down', 'right-left'];

  private animals: any[] = [{path: `${this.assetsBasePath}/animals/cebra.png`}, {path: `${this.assetsBasePath}/animals/coco.png`},
          {path: `${this.assetsBasePath}/animals/elefante.png`}, {path: `${this.assetsBasePath}/animals/hipopotamo.png`},
          {path: `${this.assetsBasePath}/animals/jirafa.png`}, {path: `${this.assetsBasePath}/animals/leon.png`}];

  getFabElements()
  {
    return this.elements;
  }

  getFabLanguages()
  {
    return this.languages;
  }

  getUsers()
  {
    return this.users;
  }

  getAnimatedBackgroundImg()
  {
    return this.animateImgBackground;
  }

  getClasses()
  {
    return this.classes;
  }

  getAssetsBasePath()
  {
    return this.assetsBasePath;
  }

  getAnimals()
  {
    return this.animals;
  }
}
