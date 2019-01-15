import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.less']
})
export class VehiclesComponent implements OnInit {

  title = 'vehicles page';
  brands: Observable<any[]>;
  vehicles: Observable<any[]>;

  myForm: FormGroup;

  constructor(db: AngularFirestore, private fb: FormBuilder) {
    this.brands = db.collection('brand').valueChanges();
    this.vehicles = db.collection('vehicle').valueChanges();
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      brand: ['', [Validators.maxLength(20)]],
      gearbox: [''],
      minPrice: [''],
      maxPrice: ['']
    });
  }

  clearFilters() {
    this.myForm.setValue({
      brand: '',
      gearbox: '',
      minPrice: '',
      maxPrice: ''
    });
  }

  applyFilters() {
  }

}
