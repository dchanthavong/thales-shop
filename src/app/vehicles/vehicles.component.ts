import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.less']
})
export class VehiclesComponent implements OnInit {

  title = 'vehicles page';
  items: Observable<any[]>;
  constructor(db: AngularFirestore) {
    this.items = db.collection('brand').valueChanges();
  }

  ngOnInit() {
  }

}
