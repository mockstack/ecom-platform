import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
	providedIn: 'root'
})
export class CookiePolicyService {

	//values can be deny/allow
	private KEY = 'cookieconsent_status';
	//true for accept false for deny
	private _policyAccepted: boolean;

	constructor(private cookieService: CookieService) { }

	public get policyAccepted() {
		let status: string = this.cookieService.get(this.KEY);
		if (status !== undefined && status === 'allow') {
			this._policyAccepted = true;
		} else {
			this._policyAccepted = false;
		}
		return this._policyAccepted;
	}

}