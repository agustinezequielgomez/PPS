import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../Services/data.service';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Usuario } from '../Classes/usuario';
import { AngularFirestore } from '@angular/fire/firestore';
import { firebaseConfig } from '../../enviroment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  userName: string;
  password: string;
  hideSpinner: boolean;
  checkBoxChecked: boolean;
  constructor(private router: Router, private data: DataService, public toastController: ToastController, private storage: Storage,
              private afs: AngularFirestore) {
    this.hideSpinner = true;
    this.checkBoxChecked = false;
    this.userName = '';
    this.password = '';
  }

  ngOnInit() {
    this.data.currentName.subscribe(nombre => this.userName = nombre);
  }

  public LoginUser(): void {
    this.hideSpinner = false;
    let success = false;
    const usuariosCollection = this.afs.collection('usuarios');
    usuariosCollection.get().subscribe((document) => {
      document.forEach((usuarios) => {
        const usuario = [Object.values(usuarios.data())];
        usuario[0].forEach((usuarioRecorrido) => {
          if (usuarioRecorrido.username === this.userName && usuarioRecorrido.password === this.password) {
            success = true;
            if(this.checkBoxChecked === true)
            {
              this.storage.set('logged', true);
              this.storage.set('name', this.userName);
            }
            this.data.sendName(this.userName);
            this.hideSpinner = true;
            this.checkBoxChecked = false;
            this.userName = '';
            this.password = '';
            this.router.navigate(['/home']);
          }
        });
      });
    });
    setTimeout(() => {
      if(!success)
      {
        this.hideSpinner = true;
        this.presentToast();
      }
    }, 5000);
  }

  checkEmptyInputs() {
    if (this.userName && this.password) {
      return false;
    }
    else {
      return true;
    }
  }

  recievePassword(password) {
    this.password = password;
  }

  async presentToast() {
    const toast = await this.toastController.create({
      animated: true,
      closeButtonText: 'Cerrar',
      color: 'danger',
      duration: 5000,
      keyboardClose: true,
      message: 'Nombre de usuario o contraseña incorrectos. Intentelo nuevamente',
      position: 'bottom',
      showCloseButton: true
    });
    toast.present();
  }

}
