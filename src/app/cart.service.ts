import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems = {};
  cartInStorage = new Subject();

  constructor() { }

  addToCart(id, num): any {
    this.cartItems[id] = num;
    this.cartInStorage.next(this.cartItems);
  }

  getCartItems() {
    return this.cartItems;
  }

  getNbOfVehiclesInCart() {
    let num = 0;
    for (const vehicleId of Object.keys(this.cartItems)) {
      num = num + this.cartItems[vehicleId];
    }
    return num;
  }

  getNbOfItem(id) {
    return this.cartItems[id];
  }

  subscribeToCart() {
    return this.cartInStorage;
  }
}
