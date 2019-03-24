import { Component, OnInit } from '@angular/core';
import { CartService } from './../cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  numberOfVehiclesInCart;
  subCart: Subscription;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.subCart = this.cartService.cartInStorage.subscribe(cart => {
      this.numberOfVehiclesInCart = this.cartService.getNbOfVehiclesInCart();
    });
    this.numberOfVehiclesInCart = this.cartService.getNbOfVehiclesInCart();
  }

}
