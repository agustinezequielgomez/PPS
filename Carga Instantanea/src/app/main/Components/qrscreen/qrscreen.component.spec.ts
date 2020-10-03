import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QRScreenComponent } from './qrscreen.component';

describe('QRScreenComponent', () => {
  let component: QRScreenComponent;
  let fixture: ComponentFixture<QRScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QRScreenComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QRScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
