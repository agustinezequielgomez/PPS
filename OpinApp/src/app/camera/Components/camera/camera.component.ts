import { Component, OnInit } from '@angular/core';
import { CameraService } from '../../../core/Services/camera.service';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
})
export class CameraComponent implements OnInit {

  constructor(private camera: CameraService) { }

  async ngOnInit() {
    await this.camera.takePicture();
  }

}
