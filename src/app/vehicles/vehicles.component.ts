import { FirebaseService } from './../firebase.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Promise } from 'q';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.less']
})
export class VehiclesComponent implements OnInit {

  title = 'vehicles page';
  brands = [];
  gearboxes = [];
  vehicles = [];

  subVehicles: Subscription;
  subBrands;
  subGearboxes;

  myForm: FormGroup;

  constructor(private firebaseService: FirebaseService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.subVehicles = this.firebaseService.subscribeToVehicles().subscribe((vehicles: any) => {
      this.vehicles = vehicles;
      // this.handleVehiclesSubscription(vehicles);
    });

    this.subBrands = this.firebaseService.subscribeToBrands().then((brands: any) => {
      this.brands = brands;
    });
    this.subGearboxes = this.firebaseService.subscribeToGearboxes().then((gearboxes: any) => {
      this.gearboxes = gearboxes;
    });
    this.myForm = this.fb.group({
      brand: ['', [Validators.maxLength(20)]],
      gearbox: [''],
      minPrice: [null, [Validators.min(0)]],
      maxPrice: [null, [Validators.max(99999)]]
    });
  }

  clearFilters() {
    this.myForm.setValue({
      brand: '',
      gearbox: '',
      minPrice: null,
      maxPrice: null
    });
  }

  applyFilters(brand: String, gearbox: String, minPrice: Number, maxPrice: Number) {
    this.vehicles = this.vehicles.filter(v => v.brand === brand);
  }

}
