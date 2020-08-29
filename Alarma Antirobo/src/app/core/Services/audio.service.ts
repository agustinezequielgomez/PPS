import { Injectable } from '@angular/core';
import { NativeAudio } from '@ionic-native/native-audio/ngx';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  constructor(private audio: NativeAudio) { }

  async preloadFile(id: string, folder: string, fileName: string): Promise<void> {
    try {
      console.log(`${id}, ${fileName}`);
      await this.audio.preloadSimple(id, `assets/${folder}/${fileName}`);
    } catch (error) {
      console.error(`PRELOAD ERROR ${error}`);
    }
  }

  async playAudioFile(id: string): Promise<void> {
    try {
      await this.audio.play(id);
    } catch (error) {
      console.error(error);
    }
  }

  async preloadComplex(id: string, folder: string, fileName: string, volume: number, delay: number = 0, voices: number = 1): Promise<void> {
    try {
      await this.audio.preloadComplex(id, `assets/${folder}/${fileName}`, volume, delay, voices);
    } catch (error) {
      console.error(error);
    }
  }

  async loopAudioFile(id: string): Promise<void> {
    try {
      await this.audio.loop(id);
    } catch (error) {
      console.error(error);
    }
  }

  async unload(id: string): Promise<void> {
    try {
      await this.audio.unload(id);
    } catch (error) {
      console.error(error);
    }
  }

  async prerloadMultipleFiles(files: [{ id: string, folder: string, fileName: string }]): Promise<void> {
    files.forEach(async file => {
      try {
        this.preloadFile(file.id, file.folder, file.fileName);
      } catch (error) {
        console.error(error);
      }
    });
  }
}
