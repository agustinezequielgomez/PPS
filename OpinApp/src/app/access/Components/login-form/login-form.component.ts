import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TestUser } from 'src/app/core/Models/Classes/test-user';
import { User } from '../../../core/Models/Classes/user';
import { DataBaseCollections } from '../../../core/Models/Enums/data-base-collections.enum';
import { StorageKeys } from '../../../core/Models/Enums/storage-keys.enum';
import { AuthService } from '../../../core/Services/auth.service';
import { DataShareService } from '../../../core/Services/data-share.service';
import { DatabaseService } from '../../../core/Services/database.service';
import { NotificationService } from '../../../core/Services/notification.service';
import { StorageService } from '../../../core/Services/storage.service';
import { ComponentCreatorService } from '../../../core/Services/component-creator.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {

  public loginForm: FormGroup;
  public passwordInputType: 'text' | 'password' = 'password';
  public rememberUser = false;

  public set SetUser(user: TestUser) {
    this.loginForm.setValue({
      userName: user.correo,
      password: user.clave
    });
  }

  constructor(private auth: AuthService, private dataBase: DatabaseService, private router: Router,
              private component: ComponentCreatorService, private notification: NotificationService,
              private storage: StorageService, private share: DataShareService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      userName: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });

    this.share.TestUserObservable.subscribe((user) => {
      if (user !== null) {
        this.SetUser = user;
      }
    });
  }

  togglePasswordInput(): void {
    (this.passwordInputType === 'text') ? this.passwordInputType = 'password' : this.passwordInputType = 'text';
  }

  toggleRememberUser(): void {
    this.rememberUser = !this.rememberUser;
  }

  public async login() {
    try {
      const spinner = await this.component.createLoader('ios', 'Ingresando', true, true, 'crescent', false, 'ion-loader');
      await timer(2000).toPromise();
      const FIREBASE_USER = await this.auth.signInWithEmail(this.loginForm.controls['userName'].value,
                                                   this.loginForm.controls['password'].value.toString());
      const USER: User = {
        email: FIREBASE_USER.email,
        password: this.loginForm.controls['password'].value.toString(),
        ...await this.dataBase.getDocumentData<{role: string}>(DataBaseCollections.users, FIREBASE_USER.uid)
      };
      await this.storage.setStorage(StorageKeys.USER, USER);
      if (this.rememberUser) {
        await this.storage.setStorage(StorageKeys.TOKEN, FIREBASE_USER.refreshToken);
      }
      await spinner.dismiss();
      this.router.navigate(['main']);
    } catch (ex) {
      const ERROR: {a: any, code: string, message: string, stack: string} = ex;
      let errorMessage = '';
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
      this.notification.presentToast('danger', errorMessage, 8000, 'ios', 'bottom', 'Error al hacer login');
    }
  }
}
