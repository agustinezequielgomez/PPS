import { Component, OnInit } from '@angular/core';
import { DataService } from '../../Services/data.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  userName: string;
  constructor(private data: DataService, private router: Router, private storage: Storage, private authService: AuthService) {
    this.storage.get('name').then((name) => {
      if (name) {
        this.userName = name;
      }
    });
  }

  ngOnInit() {
    this.data.currentName.subscribe(nombre => this.userName = nombre);
  }

  cerrarSesion() {
    this.storage.clear();
    this.authService.logOut();
    this.router.navigate(['/login']);
  }
}
