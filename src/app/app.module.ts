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
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
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
import { PackComponent } from './shopping-view/pack/pack.component';
import { PackGridComponent } from './shopping-view/common/pack-grid/pack-grid.component';
import { PackContentComponent } from './shopping-view/common/pack-content/pack-content.component';
import { ModalModule } from "ngx-bootstrap/modal";
import { CookieService } from "ngx-cookie-service";
import { AppAuthService } from './service/app-auth.service';
import { CreatePackComponent } from './shopping-view/create-pack/create-pack.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ProductNameService } from './service/product-name.service';
import { ProductCategoryFilterPipe } from './pipe/product-category-filter.pipe';
import { HttpInterceptorInterceptor } from './ws/http-interceptor.interceptor';
import { CookiePolicyService } from './service/cookie-policy.service';
import { HomeGridItemComponent } from './shopping-view/common/home-grid-item/home-grid-item.component';

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("921352824143-8im63g97h3h75a5s913j87ivq8b15k2k.apps.googleusercontent.com")
    //SECRET - VBuEgJpwfwaV_BfHvv_RR3qa
    //CLIENT-ID - 921352824143-8im63g97h3h75a5s913j87ivq8b15k2k.apps.googleusercontent.com
  }
  /*,
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("278742869945500")
  }*/
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
    BreadcrumbComponent,
    PackComponent,
    PackGridComponent,
    PackContentComponent,
    CreatePackComponent,
    ProductCategoryFilterPipe,
    HomeGridItemComponent
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
    }),
    ModalModule.forRoot(),
    AccordionModule.forRoot()
  ],
  schemas: [

  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig,
    },
    CryptoService,
    CookieService,
    AppAuthService,
    ProductNameService,
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorInterceptor, multi: true},
    CookiePolicyService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
