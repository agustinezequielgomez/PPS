import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private afs: AngularFirestore) { }

  GetUserData(uid: string) {
     this.afs.collection('users').doc(uid).get()
      .subscribe((user) => {
        return user.data();
      });
  }
}
