import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import { FirebaseService } from './../firebase.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.less']
})
export class VehicleComponent implements OnInit {

  id;
  vehicleDatas = {};
  objectKeys = Object.keys;
  sub;

  constructor(private firebaseService: FirebaseService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.id = params.id;
      this.getVehicleByDocumentId();
   });
  }

  getVehicleByDocumentId() {
    console.log(this.id);
    this.firebaseService.getVehicle(this.id).then((datas: any) => {
      this.vehicleDatas = datas;
      console.log(this.vehicleDatas);
    });
  }

}
