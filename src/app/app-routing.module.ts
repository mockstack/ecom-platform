import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './shopping-view/home/home.component';
import { ProductComponent } from './shopping-view/product/product.component';
import { ProductDetailComponent } from './shopping-view/product-detail/product-detail.component';
import { CheckoutComponent } from './shopping-view/checkout/checkout.component';
import { CartComponent } from './shopping-view/cart/cart.component';
import { NotFoundComponent } from './utils/not-found/not-found.component';


const routes: Routes = [
  //{path: '', redirectTo: 'product-view', pathMatch: 'full'},
  {path: '', component: HomeComponent},
  {path: 'product-view', component: ProductComponent},
  {path: 'product-detail', component: ProductDetailComponent},
  {path: 'check-out', component: CheckoutComponent},
  {path: 'cart', component: CartComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
