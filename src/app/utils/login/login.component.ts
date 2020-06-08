import { Component, OnInit } from '@angular/core';
import { AuthService, SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { UserService } from 'src/app/ws/user.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CryptoService } from 'src/app/service/crypto.service';
import { environment } from 'src/environments/environment';
import { AppUser } from 'src/app/model/app-user';
//import { AppSocialUser } from "src/app/model/app-social-user";
import { AppAuthService } from 'src/app/service/app-auth.service';
import { UserSession } from 'src/app/model/user-session';
import Key from '../key';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
/**
 * Login component functionality.
 * Cookie will be used to keep data after closing the browser.
 * AppAuthService will be used to access session data throughout the application.
 */
export class LoginComponent implements OnInit {

	loginForm: FormGroup;

	private user: SocialUser;
	private loggedIn: boolean;

	constructor(private authService: AuthService, private userService: UserService,
		private cookieService: CookieService, private router: Router, private formBuilder: FormBuilder,
		private cryptoService: CryptoService, private appAuthService: AppAuthService) { }

	ngOnInit(): void {
		// initializing the login form
		this.loginForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', Validators.required]
		});

		// check login status
		/*this.authService.authState.subscribe((user) => {
			this.user = user;
			this.loggedIn = (user != null);
			console.log(this.loggedIn);
			if (this.loggedIn) {
				//this.router.navigateByUrl('/');
			}
		});*/
	}

	signInWithAccount() {
		this.userService.login(this.loginForm.value.email,
			this.cryptoService.set(environment.key, this.loginForm.value.password), 'APP').subscribe(data => {
				let appUser = new AppUser().deserialize(data);
				this.userService.initiateSession(appUser._id).subscribe(data => {
					// store required data in a cookie
					this.setCookies(appUser, new UserSession().deserialize(data));
					//setting service attributes
					this.appAuthService.initiateSession(appUser, new UserSession().deserialize(data), true);
					this.router.navigateByUrl('/');
				}, error => {
					console.log(error);
				});
			}, error => {
				console.log(error);
			});
	}

	signInWithGoogle(): void {
		this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(data => {
			//app user without user id (_id)
			let appUser = new AppUser().deserialize(data);
			this.userService.getUserBySocialId(appUser.id).subscribe((data: object[]) => {
				// app user with user id
				if (data.length > 0) {
					// there is already registered user
					appUser = new AppUser().deserialize(data[0]);
					this.userService.updateUser(appUser).subscribe(data => {
						// user update success
						this.userService.initiateSession(appUser._id).subscribe(data => {
							// store required data in a cookie
							this.setCookies(appUser, new UserSession().deserialize(data));
							//setting service attributes
							this.appAuthService.initiateSession(appUser, new UserSession().deserialize(data), true);
							this.router.navigateByUrl('/');
						}, error => {
							console.log(error);
						});
					}, error => {
						console.log(error);
					})
				} else {
					// there is no user so we sould inser it.
					//console.log(data)
					this.userService.addUser(appUser).subscribe(userId => {
						appUser._id = userId + '';
						this.userService.initiateSession(appUser._id).subscribe(data => {
							// store required data in a cookie
							this.setCookies(appUser, new UserSession().deserialize(data));
							//setting service attributes
							this.appAuthService.initiateSession(appUser, new UserSession().deserialize(data), true);
							this.router.navigateByUrl('/');
						}, error => {
							console.log(error);
						});
					}, error => {
						console.log(error)
					});
				}
			}, error => {
				console.log(error);
			});
		}).catch(error => {
			console.log(error);
		});
	}

	signInWithFB(): void {
		this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(data => {
			//app user without user id (_id)
			let appUser = new AppUser().deserialize(data);
			this.userService.getUserBySocialId(appUser.id).subscribe((data: object[]) => {
				// app user with user id
				if (data.length > 0) {
					// there is already registered user
					appUser = new AppUser().deserialize(data[0]);
					this.userService.updateUser(appUser).subscribe(data => {
						// user update success
						this.userService.initiateSession(appUser._id).subscribe(data => {
							// store required data in a cookie
							this.setCookies(appUser, new UserSession().deserialize(data));
							//setting service attributes
							this.appAuthService.initiateSession(appUser, new UserSession().deserialize(data), true);
							this.router.navigateByUrl('/');
						}, error => {
							console.log(error);
						});
					}, error => {
						console.log(error);
					})
				} else {
					// there is no user so we sould inser it.
					//console.log(data)
					this.userService.addUser(appUser).subscribe(userId => {
						appUser._id = userId + '';
						this.userService.initiateSession(appUser._id).subscribe(data => {
							// store required data in a cookie
							this.setCookies(appUser, new UserSession().deserialize(data));
							//setting service attributes
							this.appAuthService.initiateSession(appUser, new UserSession().deserialize(data), true);
							this.router.navigateByUrl('/');
						}, error => {
							console.log(error);
						});
					}, error => {
						console.log(error)
					});
				}
			}, error => {
				console.log(error);
			});
		}).catch(error => {
			console.log(error);
		});
	}

	/**Save user login information in the session storage */
	saveSessionData(appUser, session, status) {
		sessionStorage.setItem(Key.SS_LOGGED_USER, JSON.stringify(appUser));
		sessionStorage.setItem(Key.SS_LOGGED_USER_SESSION, JSON.stringify(session));
		sessionStorage.setItem(Key.SS_IS_USER_LOGGEDIN, JSON.stringify(status));
	}

	/**Store required data in cookies */
	setCookies(appUser: AppUser, session: UserSession) {
		this.cookieService.set(Key.COOKIE_USER_ID, appUser._id);
		this.cookieService.set(Key.COOKIE_USER, JSON.stringify(appUser));
		this.cookieService.set(Key.COOKIE_USER_SESSION, JSON.stringify(session));
	}

	signOut(): void {
		this.cookieService.deleteAll();
		this.authService.signOut();
		this.appAuthService.reset();

		// remove all from the session storage
		for (let index = 0; index < sessionStorage.length; index++) {
			const element = sessionStorage[index];
			sessionStorage.removeItem(sessionStorage.key(index));
		}
	}
}
