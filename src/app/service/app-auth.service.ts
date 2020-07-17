import { Injectable } from '@angular/core';
import { AppUser } from '../model/app-user';
import { UserSession } from '../model/user-session';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import Key from '../utils/key';
import { AuthService } from 'angularx-social-login';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class AppAuthService {
	private _validSessionAvailable: boolean = false;
	private _loggedUser: AppUser;
	private _userSession: UserSession;

	// behaviour subject to inform the session status changes
	private notifier = new BehaviorSubject(this._validSessionAvailable);
	// status change tracker
	sessionStatus = this.notifier.asObservable();

	constructor(private cookieService: CookieService, private socialLoginService: AuthService, private router: Router) { }

	public get validSessionAvailable() {
		return this._validSessionAvailable;
	}

	public set validSessionAvailable(validity: boolean) {
		this._validSessionAvailable = validity;

		// inform subscribers about the session status changes.
		this.notifier.next(validity);
	}

	public get loggedUser() {
		return this._loggedUser;
	}

	public set loggedUser(user: AppUser) {
		this._loggedUser = user;
	}

	public get userSession() {
		return this._userSession;
	}

	public set userSession(session: UserSession) {
		this._userSession = session;
	}

	/**Login the user */
	initiateSession(user: AppUser, session: UserSession, validSession: boolean) {
		this.loggedUser = user;
		this.userSession = session;
		this.validSessionAvailable = validSession;
		// set cookies
		this.cookieService.set(Key.COOKIE_USER_ID, user._id, 1, '/');
		this.cookieService.set(Key.COOKIE_USER, JSON.stringify(user), 1, '/');
		this.cookieService.set(Key.COOKIE_USER_SESSION, JSON.stringify(session), 1, '/');
	}

	/**Signout the user */
	terminateSession() {
		if (this.loggedUser.provider !== "APP") {
			this.socialLoginService.signOut();
		}

		this.loggedUser = undefined;
		this.userSession = undefined;
		this.validSessionAvailable = false;
		// delete cookies
		this.cookieService.delete(Key.COOKIE_USER_ID);
		this.cookieService.delete(Key.COOKIE_USER);
		this.cookieService.delete(Key.COOKIE_USER_SESSION);

		this.router.navigateByUrl("/");
	}


}
