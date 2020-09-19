import { Injectable } from '@angular/core';
import { NavigationEnd, Router, RoutesRecognized } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';
import { AppModule } from '../app.module';

@Injectable({
	providedIn: 'root'
})
export class RouterService {
	private previousUrl: string = undefined;
	private currentUrl: string = undefined;

	constructor(private router: Router) {
		this.router.events.pipe(filter((evt: any) => evt instanceof RoutesRecognized), pairwise()).subscribe((events: RoutesRecognized[]) => {
			this.previousUrl = events[0].urlAfterRedirects;
			this.currentUrl = events[1].urlAfterRedirects;
			console.log(this.previousUrl + '--' + this.currentUrl);
		});
	}

	public getPreviousUrl() {
		return this.previousUrl;
	}

	public getCurrentUrl() {
		return this.currentUrl;
	}
}
