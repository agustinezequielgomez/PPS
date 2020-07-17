import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../Services/data.service';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthService } from '../Services/auth.service';
import { StoreService } from '../Services/store.service';
import { Vibration } from '@ionic-native/vibration/ngx';
import { timer } from 'rxjs';

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
  pickedClass: string;
  pickedImg: string;

  // DOM Handling
  hideSpinner: boolean;
  checkBoxChecked: boolean;

  public users: any[];
  public img: string[];
  public classes: string[];

  constructor(private router: Router, private data: DataService, public toastController: ToastController, private storage: Storage,
              private authService: AuthService, private storeService: StoreService, private vibration: Vibration) {
    this.hideSpinner = true;
    this.checkBoxChecked = false;
    this.userName = '';
    this.password = '';
    this.pickedClass = '';
    this.pickedImg = '';
  }

  ngOnInit() {
    this.animateBackground();
    this.users = this.data.getUsers();
    this.img = this.data.getAnimatedBackgroundImg();
    this.classes = this.data.getClasses();
  }


  public LoginUser(): void {
    this.playClick('../../assets/sounds/click.wav');
    this.hideSpinner = false;
    this.authService.loginEmailUser(this.userName, this.password)
      .then((res: firebase.auth.UserCredential) => {
        this.storage.set('user_data', JSON.stringify(this.storeService.GetUserData(res.user.uid)));
        if (this.checkBoxChecked === true) {
          this.storage.set('logged', true);
          this.storage.set('name', this.userName);
        }
        this.hideSpinner = true;
        this.checkBoxChecked = false;
        this.userName = '';
        this.password = '';
        this.router.navigate(['/home']);
      }).catch((err) => {
        setTimeout(() => {
          this.vibration.vibrate(500);
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
        default:
          return 'Hubo un error con su ingreso. Intentelo nuevamente';
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
    this.playClick('../../assets/sounds/click.wav');
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

  animateBackground() {
    this.pickedClass = '';
    this.pickedImg = '';
    timer(3000).subscribe(() => {
      this.pickedImg = this.img[Math.floor(Math.random() * this.img.length)];
      this.pickedClass = this.classes[Math.floor(Math.random() * this.classes.length)];
      timer(10000).subscribe(() => {
        this.animateBackground();
      });
    });
  }

  playClick(src: string) {
    const AUDIO = new Audio();
    AUDIO.src = src;
    AUDIO.load();
    AUDIO.play();
  }

}
