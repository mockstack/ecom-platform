import { Component } from '@angular/core';
import { UserService } from './ws/user.service';
import { UserSession } from './model/user-session';
import { AppUser } from './model/app-user';
import { CookieService } from 'ngx-cookie-service';
import Key from 'src/app/utils/key';
import { AppAuthService } from './service/app-auth.service';
import { CartService } from './ws/cart.service';
import { Cart } from './model/cart';
import { CartDataService } from './service/cart-data.service';
import { Router, NavigationEnd } from '@angular/router';

declare let gtag: Function;

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'ecom-platform';

	constructor(private userService: UserService, private cookieService: CookieService,
		public appAuthService: AppAuthService, private cartService: CartService,
		private cartDataService: CartDataService, private router: Router) {
		this.router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
				gtag('config', 'UA-177320223-1',
					{
						'page_path': event.urlAfterRedirects
					}
				);
			}
		});
	}

	async ngOnInit() {
		await this.validateUserSession();

		if (this.cookieService.get(Key.CART_ID) !== '') {
			this.cartService.getCartByCartId(this.cookieService.get(Key.CART_ID)).subscribe((data: Cart) => {
				if (data === null) return;
				this.cartDataService.cart = data;
			});
		}
	}

	async validateUserSession() {
		if (this.cookieService.get(Key.COOKIE_USER) !== '') {
			const appUser: AppUser = new AppUser().deserialize(JSON.parse(this.cookieService.get(Key.COOKIE_USER)));
			const prevSession: UserSession = new UserSession().deserialize(JSON.parse(this.cookieService.get(Key.COOKIE_USER_SESSION)));

			await this.userService.validateSession(appUser._id).then((session) => {
				const validatedSession = new UserSession().deserialize(session);
				this.appAuthService.initiateSession(appUser, validatedSession, true);
			}).catch(reason => {
				this.cookieService.deleteAll();
				this.appAuthService.terminateSession();
			});
		}
	}


}
