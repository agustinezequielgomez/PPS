import { Component, OnInit } from '@angular/core';
import { DataService } from '../Services/data.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AuthService } from '../Services/auth.service';
import { timer } from 'rxjs';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public assetsBasePath = '../../assets/';
  public languages: any[];
  public elements: any[];
  public currentLanguage = {language: '', path: ''};
  public currentElement = {element: '', path: ''};
  public pickedElement = false;
  public pickedLanguage = false;
  public displayElements: any[];
  public changeElements = false;
  public changingElements = false;
  public outElements = false;
  constructor(private data: DataService, private router: Router, private storage: Storage, private authService: AuthService,
              private platform: Platform) {
  }

  ngOnInit() {
    this.languages = this.data.getFabLanguages();
    this.elements = this.data.getFabElements();
  }

  selectLanguage(language: any) {
    this.playClick();
    this.currentLanguage = language;
    this.pickedLanguage = true;
    this.selectDisplayElements();
  }

  selectElement(element: any) {
    this.playClick();
    this.currentElement = element;
    this.pickedElement = true;
    this.outElements = true;
    timer(500).subscribe(() => {
      this.changingElements = true;
      this.outElements = false;
      this.changeElements = true;
    });
    timer(800).subscribe(() => {
      this.selectDisplayElements();
      this.changingElements = false;
    });
    timer(1400).subscribe(() => {
      this.changeElements = false;
    });
  }

  playSound(path: string) {
    const AUDIO = new Audio();
    AUDIO.src = path;
    AUDIO.load();
    AUDIO.play();
  }

  playClick() {
    this.playSound(`${this.data.getAssetsBasePath()}/sounds/click.wav`);
  }

  isXs() {
    return (this.platform.width() < 576);
  }

  selectDisplayElements() {
    if (this.pickedElement === true && this.pickedLanguage === true) {
      this.displayElements = this.data.getDisplayCardElements(this.currentLanguage.language, this.currentElement.element);
    }
  }

  cerrarSesion() {
    this.storage.clear();
    this.authService.logOut();
    this.router.navigate(['/login']);
  }
}
