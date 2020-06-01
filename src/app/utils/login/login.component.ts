import { Component, OnInit } from '@angular/core';
import { AuthService, SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { UserService } from 'src/app/ws/user.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	email: string;
	password: string;

	private user: SocialUser;
	private loggedIn: boolean;

	constructor(private authService: AuthService, private userService: UserService) { }

	ngOnInit(): void {
		this.authService.authState.subscribe((user) => {
			this.user = user;
			this.loggedIn = (user != null);
			console.log(this.loggedIn);
			if (this.loggedIn) {
				//forward to the correct position
			} else {
				//show login
			}
		});
	}

	signInWithAccount() {
		console.log(this.email);
		console.log(this.password);
	}

	signInWithGoogle(): void {
		this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(data=>{
			this.userService.addSocialLogin(data).subscribe(data=>{
				console.log(data)
			}, error=>{
				console.log(error)
			});
		}).catch(error => {
			console.log(error);
		});
	}

	signInWithFB(): void {
		this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(data=>{
			this.userService.addSocialLogin(data);
		}).catch(error => {
			console.log(error);
		});
	}

	signOut(): void {
		this.authService.signOut();
	}
}
