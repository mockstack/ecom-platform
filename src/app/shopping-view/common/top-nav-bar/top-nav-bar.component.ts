import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/ws/product.service';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/public_api';
import { BcNavigation } from 'src/app/model/bc-navigation';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/ws/user.service';
import { AuthService } from 'angularx-social-login';
import { AppAuthService } from 'src/app/service/app-auth.service';
import { ProductNameService } from 'src/app/service/product-name.service';
import Key from 'src/app/utils/key';
import { CartDataService } from 'src/app/service/cart-data.service';
import { CartItem } from 'src/app/model/cart-item';
import { SearchTermService } from 'src/app/ws/search-term.service';

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
	public searchItemAvailable: Boolean = true;

	constructor(private router: Router, private productService: ProductService,
		private activatedRoute: ActivatedRoute, private cookieService: CookieService,
		private userService: UserService, private authService: AuthService,
		private ref: ChangeDetectorRef, public appAuthService: AppAuthService,
		private productNameService: ProductNameService, private cartDataService: CartDataService,
		private searchTermService: SearchTermService) {
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

		this.cartDataService.selectionStatus.subscribe((data: CartItem[]) => {
			this.cartItemCount = data.length;
			this.cartItems = data;
		}, error => {

		});
	}

	onSelectProduct(event: TypeaheadMatch): void {
		this.selectedOption = event.item._id;
		this.router.navigateByUrl('product/' + event.item._id);
	}

	searchButtonClick(selectedProduct: any) {
		// if the search item is not available then add it to the db.
		if (this.productList.map((val, ind) => val.name).indexOf(this.selectedProduct) === -1) {
			this.selectedProduct = '';
			this.searchItemAvailable = false;
			this.searchTermService.addSearchTerm(selectedProduct).subscribe(data => { });
			setTimeout(() => {
				this.searchItemAvailable = true;
			}, 2000);
		}
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
		this.router.navigateByUrl('pack')
	}

	showProfile() {
		this.router.navigateByUrl('profile')
	}

	signOut(): void {
		this.appAuthService.terminateSession();
	}
}
