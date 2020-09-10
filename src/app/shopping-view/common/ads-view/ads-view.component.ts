import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-ads-view',
	templateUrl: './ads-view.component.html',
	styleUrls: ['./ads-view.component.scss']
})
export class AdsViewComponent implements OnInit {

	constructor(private router: Router) { }

	ngOnInit(): void {
	}

	showCackes() {
		this.router.navigate(['/products', environment.adsView[0].name, environment.adsView[0].id]);
	}

	showSarees() {
		this.router.navigate(['/products', environment.adsView[2].name, environment.adsView[2].id]);
	}

	showToycars() {
		this.router.navigate(['/products', environment.adsView[1].name, environment.adsView[1].id]);
	}
}
