import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private vehicles = [];
  private brands = [];
  private gearboxes = [];

  constructor(private db: AngularFirestore) { }

  getVehicles(): any {
    return new Promise(resolve => {
      if (this.vehicles.length === 0) {
        const docRef = this.db.collection('vehicle');
        docRef.get().subscribe(docs => {
          const vehicles = [];
          docs.forEach(doc => {
            // const datas = this.transformDatas(doc.data(), doc.id);
            const datas = doc.data();

            vehicles.push(datas);
          });
          this.vehicles = vehicles;
          resolve(this.vehicles);
        });
      } else {
        resolve(this.vehicles);
      }
    });
  }

  subscribeToVehicles(): Observable<any> {
    return this.db
      .collection('vehicle')
      .snapshotChanges()
      .pipe(
        map(docs => {
          const vehicles = [];
          docs.forEach(doc => {
            // const datas = this.transformDatas(
            //   doc.payload.doc.data(),
            //   doc.payload.doc.id
            // );
            const datas = doc.payload.doc.data();
            vehicles.push(datas);
          });
          this.vehicles = vehicles;
          return vehicles;
        })
      );
  }

  subscribeToBrands() {
    return this.getDocuments('brand');
  }

  subscribeToGearboxes() {
    return this.getDocuments('gearbox');
  }

  private getDocuments(collectionId) {
    return new Promise(resolve => {
      const docRef = this.db.collection(collectionId);
      docRef.get().subscribe(docs => {
        const documents = docs.docs.map(a => a.id);
        resolve(documents);
      });
    });
  }
}
