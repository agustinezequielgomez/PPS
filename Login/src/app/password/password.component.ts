import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
})
export class PasswordComponent implements OnInit {

  type: string;
  password: string;
  constructor() 
  { 
    this.type = 'password';
  }

  showPasswordMethod(): void
  {
    if(this.type === 'password')
    {
      this.type = 'text';
    }
    else
    {
      this.type = 'password';
    }
  }

  ngOnInit() {}

}
