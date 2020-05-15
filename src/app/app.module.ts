import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopInfoBarComponent } from './shopping-view/common/top-info-bar/top-info-bar.component';
import { TopNavBarComponent } from './shopping-view/common/top-nav-bar/top-nav-bar.component';
import { HomeComponent } from './shopping-view/home/home.component';
import { ProductDetailComponent } from './shopping-view/product-detail/product-detail.component';
import { CartComponent } from './shopping-view/cart/cart.component';
import { CheckoutComponent } from './shopping-view/checkout/checkout.component';
import { ProductComponent } from './shopping-view/product/product.component';
import { NotFoundComponent } from './utils/not-found/not-found.component';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { LoginComponent } from './utils/login/login.component';
import { RegisterComponent } from './utils/register/register.component';
import { ProductTypeListComponent } from './shopping-view/common/product-type-list/product-type-list.component';
import { ProductGridItemComponent } from './shopping-view/common/product-grid-item/product-grid-item.component';
import { ProductTypePreviewComponent } from './shopping-view/common/product-type-preview/product-type-preview.component';

@NgModule({
  declarations: [
    AppComponent,
    TopInfoBarComponent,
    TopNavBarComponent,
    HomeComponent,
    ProductDetailComponent,
    CartComponent,
    CheckoutComponent,
    ProductComponent,
    NotFoundComponent,
    LoginComponent,
    RegisterComponent,
    ProductTypeListComponent,
    ProductGridItemComponent,
    ProductTypePreviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  schemas:[

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
