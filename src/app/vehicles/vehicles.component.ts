import { CartService } from './../cart.service';
import { FirebaseService } from './../firebase.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  filteredVehicles = [];
  formInputs = ['brand', 'gearbox', 'minPrice', 'maxPrice'];

  subVehicles: Subscription;
  subBrands;
  subGearboxes;

  myForm: FormGroup;

  constructor(private firebaseService: FirebaseService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.subVehicles = this.firebaseService.subscribeToVehicles().subscribe((vehicles: any) => {
      this.vehicles = vehicles;
      this.filteredVehicles = this.vehicles;
      console.log(this.vehicles);
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
      minPrice: ['', [Validators.min(0)]],
      maxPrice: ['', [Validators.max(99999)]]
    });
  }

  clearFilters() {
    this.myForm.reset();
    this.filteredVehicles = this.vehicles;
  }

  applyFilters() {
    this.formInputs.forEach(formInput => {
      if (this.myForm.get(formInput).dirty) {
        this.filteredVehicles = this.vehicles.filter(v => (v[formInput] === this.myForm.get(formInput).value));
        console.log(this.vehicles, this.myForm.get('gearbox').value);
      }
    });
  }

}
