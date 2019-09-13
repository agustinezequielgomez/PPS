import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../Services/data.service';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthService } from '../Services/auth.service';
import { StoreService } from '../Services/store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  // Properties
  userName: string;
  password: string;
  pickedName: string;

  // DOM Handling
  hideSpinner: boolean;
  checkBoxChecked: boolean;

  // Users
  public users: any[] = [{mail: 'admin@admin.com', clave: '111111'}, {mail: 'invitado@invitado.com', clave: '222222'},
{mail: 'usuario@usuario.com', clave: '333333'}, {mail: 'anonimo@anonimo.com', clave: '444444'},
{mail: 'tester@tester.com', clave: '555555'}];

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
        this.storage.set('user_data', JSON.stringify(this.storeService.GetUserData(res.user.uid)));
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
          this.presentToast(this.validateLogin(err.code));
        }, 2000);
      });
  }

  validateLogin(errCode): string
  {
    switch (errCode)
    {
      case 'auth/invalid-email':
        return 'El mail ingresado no es valido';
      case 'auth/user-not-found':
        return 'El mail ingresado no corresponde a ningun usuario';
      case 'auth/wrong-password':
        return 'Contraseña incorrecta';
    }
  }

  checkEmptyInputs() {
    if (this.userName && this.password) {
      return false;
    } else {
      return true;
    }
  }

  pickUser(pickedName)
  {
    this.users.forEach((user) =>
    {
      if(user.mail === pickedName)
      {
        this.userName = user.mail;
        this.password = user.clave;
        return;
      }
    });
  }

  recievePassword(password) {
    this.password = password;
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      animated: true,
      closeButtonText: 'Cerrar',
      color: 'danger',
      duration: 5000,
      keyboardClose: true,
      message: message,
      position: 'bottom',
      showCloseButton: true
    });
    toast.present();
  }

}
