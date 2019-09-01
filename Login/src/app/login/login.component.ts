import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../Services/data.service';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthService } from '../Services/auth.service';
import { StoreService } from '../Services/store.service';
import { AngularFireAuth } from '@angular/fire/auth';

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
              private authService: AuthService, private storeService: StoreService) {
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
    this.authService.loginEmailUser(this.userName, this.password)
      .then((res: firebase.auth.UserCredential) => {
        this.storage.set('user_data', this.storeService.GetUserData(res.user.uid));
        if (this.checkBoxChecked === true) {
          this.storage.set('logged', true);
          this.storage.set('name', this.userName);
        }
        this.data.sendName(this.userName);
        this.hideSpinner = true;
        this.checkBoxChecked = false;
        this.userName = '';
        this.password = '';
        this.router.navigate(['/home']);
      }).catch((err) => {
        setTimeout(() => {
          this.hideSpinner = true;
          this.presentToast();
        }, 2000);
      });
  }

  checkEmptyInputs() {
    if (this.userName && this.password) {
      return false;
    } else {
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
