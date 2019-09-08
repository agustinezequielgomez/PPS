import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
})
export class PasswordComponent implements OnInit {

  type: string;
  passwordIcon: string = 'eye-off';
  @Input() password: string;
  @Output() passwordSender = new EventEmitter<string>();
  constructor() {
    this.type = 'password';
    this.password = '';
  }

  showPasswordMethod(): void {
    if (this.type === 'password') {
      this.type = 'text';
      this.passwordIcon = 'eye-off';
    } else {
      this.type = 'password';
      this.passwordIcon = 'eye';
    }
  }

  typePassword() {
    this.passwordSender.emit(this.password);
  }

  ngOnInit() { }

}
