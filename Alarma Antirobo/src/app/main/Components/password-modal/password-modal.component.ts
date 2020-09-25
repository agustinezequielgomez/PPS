import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PopoverController } from '@ionic/angular';
import { StorageKeys } from 'src/app/core/Models/Enums/storage-keys.enum';
import { StorageService } from '../../../core/Services/storage.service';

@Component({
  selector: 'app-password-modal',
  templateUrl: './password-modal.component.html',
  styleUrls: ['./password-modal.component.scss'],
})
export class PasswordModalComponent implements OnInit {

  public passwordForm: FormGroup;
  public passwordInputType: 'text' | 'password' = 'password';
  constructor(private popover: PopoverController, private storage: StorageService) { }

  ngOnInit() {
    this.passwordForm = new FormGroup({
      password: new FormControl('', [Validators.required])
    });
  }

  async checkUserPassword() {
    const PASSWORD = await this.storage.getStorage<string>(StorageKeys.PASSWORD);
    if (PASSWORD === this.passwordForm.controls['password'].value.toString()) {
      this.popover.dismiss(true);
    } else {
      this.passwordForm.controls['password'].setValue('');
    }
  }

  togglePassword(): void {
    (this.passwordInputType === 'text') ? this.passwordInputType = 'password' : this.passwordInputType = 'text';
  }

}
