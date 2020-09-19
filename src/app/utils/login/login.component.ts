import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { UserService } from 'src/app/ws/user.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CryptoService } from 'src/app/service/crypto.service';
import { environment } from 'src/environments/environment';
import { AppUser } from 'src/app/model/app-user';
import { AppAuthService } from 'src/app/service/app-auth.service';
import { UserSession } from 'src/app/model/user-session';
import { RouterService } from 'src/app/service/router.service';

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
	@Input() showGuestButton: Boolean;
	public loginError: string;

	constructor(private authService: AuthService, private userService: UserService,
		private router: Router, private formBuilder: FormBuilder, private cryptoService: CryptoService,
		private appAuthService: AppAuthService, private routerService: RouterService) { }

	ngOnChanges(changes: SimpleChanges) {
		this.showGuestButton = changes.showGuestButton.currentValue;
	}

	ngOnInit(): void {
		// If there is a session then this page will be unachieveable.
		if (this.appAuthService.validSessionAvailable) {
			this.router.navigateByUrl(this.routerService.getPreviousUrl());
		}

		// If the user get session info thenmove to the previous one.
		this.appAuthService.sessionStatus.subscribe(value => {
			console.log(this.routerService.getCurrentUrl())
			this.router.navigateByUrl(this.routerService.getCurrentUrl());
		}, error => {
			console.error(error);
		});

		// initializing the login form
		this.loginForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', Validators.required]
		});
	}

	signInWithAccount() {
		this.userService.login(this.loginForm.value.email,
			this.cryptoService.set(environment.key, this.loginForm.value.password), 'APP').subscribe(data => {
				let appUser = new AppUser().deserialize(data);
				this.userService.initiateSession(appUser._id).subscribe(data => {
					//setting service attributes
					this.appAuthService.initiateSession(appUser, new UserSession().deserialize(data), true);
					console.log(this.routerService.getPreviousUrl());
					this.router.navigateByUrl(this.routerService.getPreviousUrl());
				}, error => {
					console.log(error);
					this.loginError = error.error;
				});
			}, error => {
				console.log(error);
				this.loginError = error.error;
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
							//setting service attributes
							this.appAuthService.initiateSession(appUser, new UserSession().deserialize(data), true);
							this.router.navigateByUrl(this.routerService.getPreviousUrl());
						}, error => {
							console.log(error);
						});
					}, error => {
						console.log(error);
					})
				} else {
					// there is no user so we should insert it.
					//console.log(data)
					this.userService.addUser(appUser).subscribe(userId => {
						appUser._id = userId + '';
						this.userService.initiateSession(appUser._id).subscribe(data => {
							//setting service attributes
							this.appAuthService.initiateSession(appUser, new UserSession().deserialize(data), true);
							this.router.navigateByUrl(this.routerService.getPreviousUrl());
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
							//setting service attributes
							this.appAuthService.initiateSession(appUser, new UserSession().deserialize(data), true);
							this.router.navigateByUrl(this.routerService.getPreviousUrl());
						}, error => {
							console.log(error);
						});
					}, error => {
						console.log(error);
					})
				} else {
					// there is no user so we should insert it.
					//console.log(data)
					this.userService.addUser(appUser).subscribe(userId => {
						appUser._id = userId + '';
						this.userService.initiateSession(appUser._id).subscribe(data => {
							//setting service attributes
							this.appAuthService.initiateSession(appUser, new UserSession().deserialize(data), true);
							this.router.navigateByUrl(this.routerService.getPreviousUrl());
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

	continueAsGuest() {
		this.router.navigateByUrl('checkout');
	}
}
