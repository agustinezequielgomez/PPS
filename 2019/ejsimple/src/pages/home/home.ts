import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public nombre:string;
  public apellido:string;
  public mostrar:boolean;
  public direccion:string;

  constructor(public navCtrl: NavController) {
    this.mostrar=false;
  }

  MostrarDatos(nom, ap){
    this.nombre = nom;
    this.apellido = ap;
    this.mostrar = true;
  }

}
