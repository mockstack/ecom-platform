import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/ws/product.service';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/public_api';
import { BcNavigation } from 'src/app/model/bc-navigation';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from 'src/app/ws/user.service';
import { UserSession } from 'src/app/model/user-session';
import { AppUser } from 'src/app/model/app-user';

@Component({
	selector: 'app-top-nav-bar',
	templateUrl: './top-nav-bar.component.html',
	styleUrls: ['./top-nav-bar.component.scss']
})
export class TopNavBarComponent implements OnInit {

	selectedProduct: String;
	selectedOption: String;
	productList = [];
	bcUrls: BcNavigation[] = [];
	loggedUser: AppUser;

	constructor(private router: Router, private productService: ProductService,
		private activatedRoute: ActivatedRoute, private cookieService: CookieService,
		private userService: UserService) {
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
		if (this.cookieService.get('userId') !== '') {
			//check session validity
			this.userService.validateSession(this.cookieService.get('userId')).subscribe(data => {
				//session is valid.
				const userSession = new UserSession().deserialize(data);
				this.cookieService.set('userSession', JSON.stringify(userSession));
				this.loggedUser = new AppUser().deserialize(JSON.parse(this.cookieService.get('loggedUser')));
			}, error => {
				this.cookieService.deleteAll();
				console.log('there is no valid session for the user');
			})
		} else {
			console.log('There is no userId')
		}

		//if (this.cookieService.get('userId'))
		this.productService.getProductNames().subscribe((data: any[]) => {
			this.productList = data;
		});

		this.activatedRoute.params.subscribe(values => {
			console.log(values['catid']);
		})
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
		this.router.navigateByUrl('')
	}

	showMyPacks() {
		// to be implemented
	}

	showProfile() {
		// to be implemented
	}
}
