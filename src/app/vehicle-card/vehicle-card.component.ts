import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-vehicle-card',
  templateUrl: './vehicle-card.component.html',
  styleUrls: ['./vehicle-card.component.less']
})
export class VehicleCardComponent implements OnInit {

  @Input() vehicleInfo;

  constructor() { }

  ngOnInit() {
  }

}
