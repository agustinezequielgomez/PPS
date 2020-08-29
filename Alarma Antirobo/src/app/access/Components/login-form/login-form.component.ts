import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { TestUser } from 'src/app/core/Models/Classes/test-user';
import { User } from '../../../core/Models/Classes/user';
import { DataBaseCollections } from '../../../core/Models/Enums/data-base-collections.enum';
import { StorageKeys } from '../../../core/Models/Enums/storage-keys.enum';
import { AuthService } from '../../../core/Services/auth.service';
import { ComponentCreatorService } from '../../../core/Services/component-creator.service';
import { DataShareService } from '../../../core/Services/data-share.service';
import { DatabaseService } from '../../../core/Services/database.service';
import { NotificationService } from '../../../core/Services/notification.service';
import { StorageService } from '../../../core/Services/storage.service';

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

  constructor(private auth: AuthService, private dataBase: DatabaseService, private creator: ComponentCreatorService,
              private notification: NotificationService, private storage: StorageService, private share: DataShareService,
              private router: Router) { }

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

  togglePassword(): void {
    (this.passwordInputType === 'text') ? this.passwordInputType = 'password' : this.passwordInputType = 'text';
  }

  toggleRememberUser(): void {
    this.rememberUser = !this.rememberUser;
  }

  public async login() {
    const SPINNER = await this.creator.createLoader('md', 'Ingresando...', true, true, undefined, false, 'ion-loader');
    await timer(2000).toPromise();
    try {
      const USER = await this.auth.signInWithEmail(this.loginForm.controls['userName'].value,
                                                   this.loginForm.controls['password'].value.toString());
      await this.storage.setStorage(StorageKeys.USER, await this.dataBase.getDocumentData<User>(DataBaseCollections.users, USER.uid));
      await this.storage.setStorage(StorageKeys.PASSWORD, this.loginForm.controls['password'].value.toString());
      if (this.rememberUser) {
        console.log(`REMEMBER USER: ${USER.refreshToken}`);
        await this.storage.setStorage(StorageKeys.TOKEN, USER.refreshToken);
      }

      await SPINNER.dismiss();
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
      await SPINNER.dismiss();
      this.notification.presentToast('danger', errorMessage, 8000, 'ios', 'bottom', 'Error al hacer login');
    }
  }
}
