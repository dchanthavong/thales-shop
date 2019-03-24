import { Component, OnInit } from '@angular/core';
import { CartService } from './../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.less']
})
export class CartComponent implements OnInit {

  cartItems = {};
  objectKeys = Object.keys;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartItems = this.getCartItems();
  }

  getCartItems() {
    return this.cartService.getCartItems();
  }

}
