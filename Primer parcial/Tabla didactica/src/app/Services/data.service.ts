import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private selectedLanguage;
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

  getAnimals(language: string) {
    return [
    {path: `${this.assetsBasePath}/animals/cebra.png`, sound: `${this.assetsBasePath}/animals/sounds/${language}/cebra.flac`},
    {path: `${this.assetsBasePath}/animals/coco.png`, sound: `${this.assetsBasePath}/animals/sounds/${language}/coco.flac`},
    {path: `${this.assetsBasePath}/animals/elefante.png`, sound: `${this.assetsBasePath}/animals/sounds/${language}/elefante.flac`},
    {path: `${this.assetsBasePath}/animals/hipopotamo.png`, sound: `${this.assetsBasePath}/animals/sounds/${language}/hipo.flac`},
    {path: `${this.assetsBasePath}/animals/jirafa.png`, sound: `${this.assetsBasePath}/animals/sounds/${language}/jirafa.flac`},
    {path: `${this.assetsBasePath}/animals/leon.png`, sound: `${this.assetsBasePath}/animals/sounds/${language}/leon.flac`}];
  }

  getNumbers(language: string) {
    return [
      {path: `${this.assetsBasePath}/numbers/seven.png`, sound: `${this.assetsBasePath}/numbers/sounds/${language}/seven.flac`},
      {path: `${this.assetsBasePath}/numbers/two.png`, sound: `${this.assetsBasePath}/numbers/sounds/${language}/two.flac`},
      {path: `${this.assetsBasePath}/numbers/three.png`, sound: `${this.assetsBasePath}/numbers/sounds/${language}/three.flac`},
      {path: `${this.assetsBasePath}/numbers/five.png`, sound: `${this.assetsBasePath}/numbers/sounds/${language}/five.flac`},
      {path: `${this.assetsBasePath}/numbers/nine.png`, sound: `${this.assetsBasePath}/numbers/sounds/${language}/nine.flac`},
      {path: `${this.assetsBasePath}/numbers/four.png`, sound: `${this.assetsBasePath}/numbers/sounds/${language}/four.flac`}
    ];
  }

  getColors(language: string) {
    return [
      {path: `${this.assetsBasePath}/colors/blue.png`, sound: `${this.assetsBasePath}/colors/sounds/${language}/blue.flac`},
      {path: `${this.assetsBasePath}/colors/green.png`, sound: `${this.assetsBasePath}/colors/sounds/${language}/green.flac`},
      {path: `${this.assetsBasePath}/colors/orange.png`, sound: `${this.assetsBasePath}/colors/sounds/${language}/orange.flac`},
      {path: `${this.assetsBasePath}/colors/purple.png`, sound: `${this.assetsBasePath}/colors/sounds/${language}/purple.flac`},
      {path: `${this.assetsBasePath}/colors/red.png`, sound: `${this.assetsBasePath}/colors/sounds/${language}/red.flac`},
      {path: `${this.assetsBasePath}/colors/yellow.png`, sound: `${this.assetsBasePath}/colors/sounds/${language}/yellow.flac`}
    ];
  }

  getDisplayCardElements(language: string, element: string) {
    switch (element) {
      case 'animals':
        return this.getAnimals(language);
        break;
      case 'colors':
        return this.getColors(language);
        break;
      case 'numbers':
        return this.getNumbers(language);
        break;
    }
  }
}
