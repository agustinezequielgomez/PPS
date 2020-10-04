import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { NavController } from '@ionic/angular';
const {StatusBar} = Plugins;
@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.scss'],
})
export class HomeScreenComponent implements OnInit {

  constructor(public nav: NavController) { }

  async ngOnInit() {
    await StatusBar.setBackgroundColor({ color: '#0399e2' });
  }

}
