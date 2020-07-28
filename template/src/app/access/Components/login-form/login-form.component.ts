import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../core/Models/Classes/user';
import { DataBaseCollections } from '../../../core/Models/Enums/data-base-collections.enum';
import { AuthService } from '../../../core/Services/auth.service';
import { DatabaseService } from '../../../core/Services/database.service';
import { NotificationService } from '../../../core/Services/notification.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {

  public loginForm: FormGroup;
  constructor(private auth: AuthService, private dataBase: DatabaseService, private notification: NotificationService) { }

  async ngOnInit() {
    this.loginForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  public async login() {
    try {
      const USER = await this.auth.signInWithEmail(this.loginForm.controls['userName'].value, this.loginForm.controls['password'].value);
      console.log(await this.dataBase.getDocumentData<User>(DataBaseCollections.users, USER.uid));
    } catch (ex) {
      const ERROR: {a: any, code: string, message: string, stack: string} = ex;
      let errorMessage: string = '';
      switch (ERROR.code) {
        case 'auth/invalid-email':
          errorMessage = 'Mail incorrecto. Por favor, inténtelo nuevamente';
          break;
        case 'auth/user-disabled':
          errorMessage = 'Usuario deshabilitado, lo sentimos.';
          break;
        case 'auth/user-not-found':
          errorMessage = 'Usuario no encontrado. Por favor, inténtelo nuevamente';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Contraseña incorrecta. Por favor, inténtelo nuevamente';
          break;
      }
      this.notification.presentToast('danger', errorMessage, 8000, 'ios', 'bottom', '', 'Error al hacer login');
    }
  }
}
