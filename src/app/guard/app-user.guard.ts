import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppAuthService } from '../service/app-auth.service';

@Injectable({
	providedIn: 'root'
})
export class AppUserGuard implements CanActivate {
	constructor(private appAuthService: AppAuthService, private router: Router) {

	}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		if (this.appAuthService.validSessionAvailable) {
			console.log('there is a login session')
			return true;
		} else {
			console.error('there is no session');
			this.router.navigateByUrl('/login');
		}
	}

}
