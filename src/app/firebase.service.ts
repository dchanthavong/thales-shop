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

  /* Récupère la liste des voitures à un instant t */
  getVehicles(): any {
    return new Promise(resolve => {
      if (this.vehicles.length === 0) {
        const docRef = this.db.collection('vehicle');
        docRef.get().subscribe(docs => {
          const vehicles = [];
          docs.forEach(doc => {
            // const datas = this.transformDatas(doc.data(), doc.id);
            const datas = doc.data();
            datas.id = doc.id;
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

  getVehicle(id): any {
    return new Promise(resolve => {
      this.getVehicles().then(vehicles => {
        resolve(vehicles.find(vehicle => vehicle.id === id));
      });
    });
  }

  /* S'abonne à la base pour récupérer la liste des voitures : si changement de base, met à jour */
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
            datas['id'] = doc.payload.doc.id;
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
