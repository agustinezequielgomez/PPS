import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private store: AngularFirestore) { }

  private getCollection<T>(collectionName: string): AngularFirestoreCollection<T> {
    return this.store.collection(collectionName);
  }

  private async setDocument<T>(collection: string, documentId: string, object: T): Promise<void> {
    return this.getCollection(collection).doc(documentId).set(object);
  }

  private async updateDocument<T>(collection: string, documentId: string, object: T): Promise<void> {
    return this.getCollection(collection).doc(documentId).update(object);
  }

  private async getDocRef(collection: string, documentId: string): Promise<firebase.firestore.DocumentSnapshot<DocumentData>> {
    return this.getCollection(collection).doc(documentId).get().toPromise();
  }

  public async documentExists(collection: string, documentId: string): Promise<boolean> {
    const DOC_REF = await this.getDocRef(collection, documentId);
    return DOC_REF.exists;
  }


  public async getDocument<T>(collection: string, documentId: string): Promise<T> {
    console.log(collection, documentId);
    const DATA: T = (await this.getDocRef(collection, documentId)).data() as T;
    return DATA;
  }

  public async setUpdateDocument<T>(collection: string, documentId: string, object: T): Promise<void> {
    if (await this.documentExists(collection, documentId)) {
      return this.updateDocument<T>(collection, documentId, object);
    } else {
      return this.setDocument<T>(collection, documentId, object);
    }
  }
}
