import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
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
import { AudioService } from '../../../core/Services/audio.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit, OnDestroy {

  public loginForm: FormGroup;
  public passwordInputType: 'text' | 'password' = 'password';
  public rememberUser = false;
  @Output() loggingIn = new EventEmitter<boolean>();
  public set SetUser(user: TestUser) {
    this.loginForm.setValue({
      userName: user.correo,
      password: user.clave
    });
  }

  constructor(private auth: AuthService, private dataBase: DatabaseService, private router: Router, private audio: AudioService,
              private notification: NotificationService, private storage: StorageService, private share: DataShareService) { }

  async ngOnInit() {
    this.loginForm = new FormGroup({
      userName: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });

    this.share.TestUserObservable.subscribe((user) => {
      if (user !== null) {
        this.SetUser = user;
      }
    });

    await this.audio.preloadComplex('click', 'sounds', 'click.wav', 0.5);
  }

  async ngOnDestroy() {
    await this.audio.unload('click');
  }

  async togglePasswordInput() {
    await this.audio.playAudioFile('click');
    (this.passwordInputType === 'text') ? this.passwordInputType = 'password' : this.passwordInputType = 'text';
  }

  async toggleRememberUser() {
    await this.audio.playAudioFile('click');
    this.rememberUser = !this.rememberUser;
  }

  public async login() {
    await this.audio.playAudioFile('click');
    this.loggingIn.emit(true);
    try {
      const USER = await this.auth.signInWithEmail(this.loginForm.controls['userName'].value,
                          this.loginForm.controls['password'].value.toString());
      console.log(this.rememberUser);
      await this.storage.setStorage(StorageKeys.USER, await this.dataBase.getDocumentData<User>(DataBaseCollections.users, USER.uid));
      if (this.rememberUser) {
        console.log(`REMEMBER USER: ${USER.refreshToken}`);
        await this.storage.setStorage(StorageKeys.TOKEN, USER.refreshToken);
      }
      this.loggingIn.emit(false);
      this.router.navigate(['main']);
    } catch (ex) {
      this.loggingIn.emit(false);
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
