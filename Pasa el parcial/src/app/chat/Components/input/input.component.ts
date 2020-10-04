import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {

  @Input() color: string;
  @Output() sendMessage = new EventEmitter<string>();
  public text: string = '';
  constructor() { }

  ngOnInit() {}

  inputChange({detail: {value}}) {
    this.text = value;
  }

  send() {
    this.sendMessage.emit(this.text);
    this.text = '';
  }
}
