import { Component } from '@angular/core';
import { UserService } from './ws/user.service';
import { UserSession } from './model/user-session';
import { AppUser } from './model/app-user';
import { CookieService } from 'ngx-cookie-service';
import Key from 'src/app/utils/key';
import { AppAuthService } from './service/app-auth.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'ecom-platform';

	constructor(private userService: UserService, private cookieService: CookieService,
		public appAuthService: AppAuthService) { }

	async ngOnInit() {
		await this.validateUserSession();
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
