import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-checkout-status',
	templateUrl: './checkout-status.component.html',
	styleUrls: ['./checkout-status.component.scss']
})
export class CheckoutStatusComponent implements OnInit {

	public reference: string;

	constructor(private route: ActivatedRoute, private router: Router) { }

	ngOnInit(): void {
		this.reference = this.route.snapshot.queryParams.ref;
		if (this.reference === undefined || this.reference === null || this.reference.trim() === '') {
			this.router.navigateByUrl('404');
		}
	}

}
