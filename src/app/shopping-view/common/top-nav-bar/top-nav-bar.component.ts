import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/ws/product.service';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/public_api';
import { BcNavigation } from 'src/app/model/bc-navigation';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/ws/user.service';
import { UserSession } from 'src/app/model/user-session';
import { AppUser } from 'src/app/model/app-user';
import { AuthService } from 'angularx-social-login';
import { AppAuthService } from 'src/app/service/app-auth.service';
import { ProductNameService } from 'src/app/service/product-name.service';
import Key from 'src/app/utils/key';
import { error } from 'protractor';
import { CartDataService } from 'src/app/service/cart-data.service';
import { CartItem } from 'src/app/model/cart-item';

@Component({
	selector: 'app-top-nav-bar',
	templateUrl: './top-nav-bar.component.html',
	styleUrls: ['./top-nav-bar.component.scss']
})
export class TopNavBarComponent implements OnInit {

	public selectedProduct: String;
	public selectedOption: String;
	public productList = [];
	public bcUrls: BcNavigation[] = [];
	public cartItemCount: number = 0;
	public cartItems: CartItem[];
	//public loggedUser: AppUser;

	constructor(private router: Router, private productService: ProductService,
		private activatedRoute: ActivatedRoute, private cookieService: CookieService,
		private userService: UserService, private authService: AuthService,
		private ref: ChangeDetectorRef, public appAuthService: AppAuthService,
		private productNameService: ProductNameService, private cartDataService: CartDataService) {
		router.events.subscribe(evt => {
			// console.log(evt);

			if (evt instanceof NavigationEnd) {
				if (evt.url === '/') {
					//has moved to the home, clean the array
					this.bcUrls = [];
				}
				//TODO this logic must be implemented
				//let item = new BcNavigation('a', evt.url);
			}
		});
	}

	ngOnInit(): void {
		//get the session from the cookie
		if (this.cookieService.get(Key.COOKIE_USER) !== '') {
			const appUser: AppUser = new AppUser().deserialize(JSON.parse(this.cookieService.get(Key.COOKIE_USER)));
			const prevSession: UserSession = new UserSession().deserialize(JSON.parse(this.cookieService.get(Key.COOKIE_USER_SESSION)));

			this.userService.validateSession(appUser._id).subscribe(session => {
				const validatedSession = new UserSession().deserialize(session);
				this.appAuthService.initiateSession(appUser, validatedSession, true);
			}, error => {
				this.cookieService.deleteAll();
				this.appAuthService.reset();
			});
		}

		//REMOVED SINCE SESSION VALIDATION IS DONE THROUGH THE COOKIE
		/*if (this.cookieService.get(Key.COOKIE_USER_ID) !== '') {
			console.log('validate ' + this.cookieService.get(Key.COOKIE_USER_ID))
			//check session validity
			this.userService.validateSession(this.cookieService.get(Key.COOKIE_USER_ID)).subscribe(data => {
				//session is valid.
				console.log('session validation -> ' + data);
				const userSession = new UserSession().deserialize(data);
				//this.cookieService.set('userSession', JSON.stringify(userSession));

				this.userService.getUserByUserId(this.cookieService.get(Key.COOKIE_USER_ID)).subscribe(user => {
					//remvoe user from cookie
					//get it from session validation which is supposed to populate over userid
					//this.loggedUser = new AppUser().deserialize(JSON.parse(this.cookieService.get('loggedUser')));
					this.loggedUser = new AppUser().deserialize(user);
					//console.log(this.loggedUser);

					//setting service attributes
					this.appAuthService.initiateSession(this.loggedUser, userSession, true);
					// save data in session storage
					//sessionStorage.setItem(Key.SS_LOGGED_USER, JSON.stringify(this.loggedUser));
					//sessionStorage.setItem(Key.SS_LOGGED_USER_SESSION, JSON.stringify(userSession));
					//sessionStorage.setItem(Key.SS_IS_USER_LOGGEDIN, JSON.stringify(true));
				}, error => {
					console.log('cannot get the user by user id - ' + error);
				});
			}, error => {
				this.cookieService.deleteAll();
				this.appAuthService.reset();
				console.log('there is no valid session for the user');
			});
		} else {
			console.log('cant validate')
			this.cookieService.deleteAll();
			this.appAuthService.reset();
			console.log('There is no userId ' + this.loggedUser)
		}*/

		//if (this.cookieService.get('userId'))
		this.productService.getProductNames().subscribe((data: any[]) => {
			this.productList = data;
			this.productNameService.productList = data;
			// storing the product list in the session storage.
			sessionStorage.setItem(Key.SS_PRODUCT_LIST, JSON.stringify(data));
		});

		this.activatedRoute.params.subscribe(values => {
			//console.log(values['catid']);
		})

		this.cartDataService.selectionStatus.subscribe( (data: CartItem[]) => {
			this.cartItemCount = data.length;
			this.cartItems = data;
		}, error => {

		});
	}

	onSelectProduct(event: TypeaheadMatch): void {
		this.selectedOption = event.item._id;
		console.log(this.selectedOption)
	}

	showPacks() {
		this.router.navigateByUrl('pack')
	}

	showCart() {
		this.router.navigateByUrl('cart');
	}

	showLogin() {
		this.router.navigateByUrl('login');
	}

	showRegister() {
		this.router.navigateByUrl('register');
	}

	showHome() {
		this.router.navigateByUrl('/')
	}

	showMyPacks() {
		// to be implemented
	}

	showProfile() {
		// to be implemented
	}

	signOut(): void {
		this.authService.signOut();
		this.appAuthService.reset();
		this.cookieService.delete(Key.COOKIE_USER_ID);
		this.ref.detectChanges();
	}
}
