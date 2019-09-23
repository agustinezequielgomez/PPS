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
  public currentLanguageImgPath = '';
  public currentElementImgPath = '';
  public pickedElement = false;
  public pickedLanguage = false;
  public animals: any[];
  constructor(private data: DataService, private router: Router, private storage: Storage, private authService: AuthService,
              private platform: Platform) {
  }

  ngOnInit() {
    this.languages = this.data.getFabLanguages();
    this.elements = this.data.getFabElements();
    this.animals = this.data.getAnimals();

  }

  selectLanguage(language: any) {
    this.playClick();
    this.currentLanguageImgPath = language.path;
    this.pickedLanguage = true;
  }

  selectElement(element: any) {
    this.playClick();
    this.currentElementImgPath = element.path;
    this.pickedElement = true;
  }

  playSound(path: string)
  {
    const AUDIO = new Audio();
    AUDIO.src = path;
    AUDIO.load();
    AUDIO.play();
  }

  playClick()
  {
    this.playSound(`${this.data.getAssetsBasePath()}/sounds/click.wav`);
  }

  isXs() {
    return (this.platform.width() < 576);
  }

  cerrarSesion() {
    this.storage.clear();
    this.authService.logOut();
    this.router.navigate(['/login']);
  }
}
