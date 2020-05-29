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
import { FooterComponent } from './shopping-view/common/footer/footer.component';
import { AdCarouselComponent } from './shopping-view/common/ad-carousel/ad-carousel.component';
import { HttpClientModule } from "@angular/common/http";
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LoadingComponent, RepeatDirective } from './shopping-view/common/loading/loading.component';
import { AdStatCustomerComponent } from './shopping-view/common/ad-stat-customer/ad-stat-customer.component';
import { BreadcrumbComponent } from './shopping-view/common/breadcrumb/breadcrumb.component';
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";
import { CryptoService } from './service/crypto.service';
import { ToastrModule } from 'ngx-toastr';

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("Google-OAuth-Client-Id")
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("Facebook-App-Id")
  }
]);

export function provideConfig() {
  return config;
}

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
    ProductTypePreviewComponent,
    FooterComponent,
    AdCarouselComponent,
    LoadingComponent,
    RepeatDirective,
    AdStatCustomerComponent,
    BreadcrumbComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TypeaheadModule.forRoot(),
    BrowserAnimationsModule,
    SocialLoginModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    })
  ],
  schemas: [

  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig,
    },
    CryptoService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
