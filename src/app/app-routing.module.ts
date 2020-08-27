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
import { PackComponent } from './shopping-view/pack/pack.component';
import { PackContentComponent } from './shopping-view/common/pack-content/pack-content.component';
import { CreatePackComponent } from './shopping-view/create-pack/create-pack.component';
import { AppUserGuard } from './guard/app-user.guard';
import { CheckoutStatusComponent } from './shopping-view/common/checkout-status/checkout-status.component';
import { UserProfileComponent } from './shopping-view/user-profile/user-profile.component';


const routes: Routes = [
	//{path: '', redirectTo: 'product-view', pathMatch: 'full'},
	{ path: '', component: HomeComponent, data: { bcNav: 'Home' } },
	{ path: 'product', pathMatch: 'full', redirectTo: '' },
	{ path: 'products/:cat/:catid', component: ProductComponent, data: { bcNav: 'Products' } },
	{ path: 'product/:id', component: ProductDetailComponent, data: { bcNav: 'Detail' } },
	{ path: 'checkout', component: CheckoutComponent, data: { bcNav: 'Checkout' } },
	{ path: 'costatus', component: CheckoutStatusComponent, data: { bcNav: 'Status' } },
	{ path: 'cart', component: CartComponent, data: { bcNav: 'Cart' } },
	{ path: 'login', component: LoginComponent, data: { bcNav: 'Login' } },
	{ path: 'register', component: RegisterComponent, data: { bcNav: 'Register' } },
	{ path: 'pack', component: PackComponent, data: { bcNav: 'Packs' } },
	{ path: 'detail', component: PackContentComponent, data: { bcNav: 'Edit Pack' } },
	{ path: 'create', component: CreatePackComponent, data: { bcNav: 'Create Pack' } },
	{ path: 'create/:packId', component: CreatePackComponent, data: { bcNav: 'Edit Pack' } },
	{ path: 'profile', component: UserProfileComponent, data: { bcNav: 'User Profile' } },
	{ path: '**', component: NotFoundComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
	exports: [RouterModule]
})
export class AppRoutingModule { }
