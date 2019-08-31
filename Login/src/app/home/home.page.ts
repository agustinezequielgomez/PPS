import { Component, OnInit } from '@angular/core';
import { DataService } from '../Services/data.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  userName: string;
  constructor(private data: DataService, private router: Router, private storage: Storage) 
  {
    this.storage.get('name').then((name) =>
    {
      if(name)
      {
        this.userName = name;
      }
    });
  }

  ngOnInit(){
    this.data.currentName.subscribe(nombre => this.userName = nombre);
  }

  cerrarSesion()
  {
    this.storage.clear();
    this.router.navigate(['/login']);
  }
}
