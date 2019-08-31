import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private nameSoruce = new BehaviorSubject<string>('');
  currentName = this.nameSoruce.asObservable();
  constructor() { }

  sendName(name: string)
  {
    this.nameSoruce.next(name);
  }
}
