import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AppAuthService } from '../service/app-auth.service';
import { AppUser } from '../model/app-user';
import { UserSession } from '../model/user-session';
import Key from '../utils/key';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../ws/user.service';

@Injectable({
	providedIn: 'root'
})
export class AppUserGuard implements CanActivate {

	constructor(private appAuthService: AppAuthService, private router: Router, private cookieService: CookieService,
		private userService: UserService) { }

	async canActivate() {
		await this.validateUserSession();

		if (!this.appAuthService.validSessionAvailable) {
			this.router.navigate(['login']);
			return false;
		}
		return true;
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
			})
		}
	}

}
