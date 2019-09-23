import { AngularFirestore } from '@angular/fire/firestore';

export class Usuario {
    public constructor(public username: string, public password: string, public firestore: AngularFirestore)
    {
        this.username = username;
        this.password = password;
        this.firestore = firestore;
    }
}
