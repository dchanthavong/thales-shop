import { Component, OnInit, Input } from '@angular/core';
import { CartService } from './../cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-vehicle-card',
  templateUrl: './vehicle-card.component.html',
  styleUrls: ['./vehicle-card.component.less']
})
export class VehicleCardComponent implements OnInit {

  @Input() vehicleInfo;
  numbers = [0, 1, 2];
  isVehicleInCart;
  subCart: Subscription;
  cart = {};

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.subCart = this.cartService.cartInStorage.subscribe(cart => {
      this.cart = cart;
      this.isVehiclePresent();
    });
    this.cart = this.cartService.getCartItems();
    this.isVehiclePresent();
  }

  addToCart(num): any {
    this.cartService.addToCart(this.vehicleInfo.id, num);
  }

  getNbOfItem(id) {
    return this.cartService.getNbOfItem(id);
  }

  isVehiclePresent() {
    if (this.getNbOfItem(this.vehicleInfo.id)) {
      this.isVehicleInCart = false;
    } else {
      this.isVehicleInCart = true;
    }
  }

}
