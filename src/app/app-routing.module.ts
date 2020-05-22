import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './shopping-view/home/home.component';
import { ProductComponent } from './shopping-view/product/product.component';
import { ProductDetailComponent } from './shopping-view/product-detail/product-detail.component';
import { CheckoutComponent } from './shopping-view/checkout/checkout.component';
import { CartComponent } from './shopping-view/cart/cart.component';
import { NotFoundComponent } from './utils/not-found/not-found.component';
import { LoginComponent } from './utils/login/login.component';
import { RegisterComponent } from './utils/register/register.component';


const routes: Routes = [
  //{path: '', redirectTo: 'product-view', pathMatch: 'full'},
  {path: '', component: HomeComponent},
  {path: 'product', pathMatch: 'full', redirectTo: ''},
  {path: 'product/:catid', component: ProductComponent},
  {path: 'detail', component: ProductDetailComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'cart', component: CartComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
