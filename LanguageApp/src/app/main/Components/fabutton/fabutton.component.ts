import { Component, OnInit } from '@angular/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Languages } from 'src/app/core/Models/Enums/languages.enum';
import { Elements } from '../../../core/Models/Enums/elements.enum';
import { FABPosition, FABStatus } from '../../../core/Models/Interfaces/fabstatus';
import { DataShareService } from '../../../core/Services/data-share.service';
import { AudioService } from '../../../core/Services/audio.service';

@Component({
  selector: 'app-fabutton',
  templateUrl: './fabutton.component.html',
  styleUrls: ['./fabutton.component.scss'],
})
export class FAButtonComponent implements OnInit {

  public languageFab: FABStatus<Languages>;
  public elementFab: FABStatus<Elements>;
  public flagFabImgPath: string;
  public elementFabImgPath: string;
  constructor(private orientation: ScreenOrientation, public data: DataShareService, private audio: AudioService) { }

  async ngOnInit() {
    this.data.CurrentFlag.subscribe(path => {
      this.flagFabImgPath = path;
    });
    this.data.CurrentElementImg.subscribe(path => {
      this.elementFabImgPath = path;
    });
    const LANGUAGE_FAB_POSITION_PORTRAIT: FABPosition = { vertical: 'bottom', horizontal: 'start', side: 'end' };
    const ELEMENT_FAB_POSITION_PORTRAIT: FABPosition = { vertical: 'bottom', horizontal: 'end', side: 'start' };
    const LANGUAGE_FAB_POSITION_LANDSCAPE: FABPosition = { vertical: 'top', horizontal: 'start', side: 'bottom' };
    const ELEMENT_FAB_POSITION_LANDSCAPE: FABPosition = { vertical: 'top', horizontal: 'end', side: 'bottom' };
    this.languageFab = {
      opened: false,
      currentValue: this.data.CurrentLanguage,
      position: LANGUAGE_FAB_POSITION_PORTRAIT
    };
    this.elementFab = {
      opened: false,
      currentValue: this.data.CurrentElement,
      position: ELEMENT_FAB_POSITION_PORTRAIT
    };
    if (this.orientation.type === this.orientation.ORIENTATIONS.PORTRAIT_PRIMARY) {
      this.languageFab.position = LANGUAGE_FAB_POSITION_PORTRAIT;
      this.elementFab.position = ELEMENT_FAB_POSITION_PORTRAIT;
    } else {
      this.languageFab.position = LANGUAGE_FAB_POSITION_LANDSCAPE;
      this.elementFab.position = ELEMENT_FAB_POSITION_LANDSCAPE;
    }
    this.orientation.onChange().subscribe(() => {
      if (this.orientation.type === this.orientation.ORIENTATIONS.PORTRAIT_PRIMARY) {
        this.languageFab.position = LANGUAGE_FAB_POSITION_PORTRAIT;
        this.elementFab.position = ELEMENT_FAB_POSITION_PORTRAIT;
      } else {
        this.languageFab.position = LANGUAGE_FAB_POSITION_LANDSCAPE;
        this.elementFab.position = ELEMENT_FAB_POSITION_LANDSCAPE;
      }
    });
  }


  async openLanguageFab() {
    this.elementFab.opened = false;
    this.languageFab.opened = true;
  }

  async openElementFab() {
    this.languageFab.opened = false;
    this.elementFab.opened = true;
  }

  async selectElement(element: Elements) {
    this.data.CurrentElement = element;
    this.elementFab.currentValue = element;
  }

  async selectLanguage(language: Languages) {
    this.data.CurrentLanguage = language;
    this.languageFab.currentValue = language;
  }
}
