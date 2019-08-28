import { Component, OnInit } from '@angular/core';
import { PasswordComponent } from '../password/password.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  userName: string;
  password: PasswordComponent;
  constructor() 
  {
    this.password = new PasswordComponent();
  }

  ngOnInit() {}

}
