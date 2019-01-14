import { VehicleComponent } from './vehicle/vehicle.component';
import { CommandsHistoryComponent } from './commands-history/commands-history.component';
import { CartComponent } from './cart/cart.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'vehicles', component: VehiclesComponent},
  {path: 'cart', component: CartComponent},
  {path: 'commands-history', component: CommandsHistoryComponent},
  {path: 'vehicle/:id', component: VehicleComponent},
  {path: '**', redirectTo: 'vehicles'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
