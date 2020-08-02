import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/ws/cart.service';

@Component({
	selector: 'app-checkout-status',
	templateUrl: './checkout-status.component.html',
	styleUrls: ['./checkout-status.component.scss']
})
export class CheckoutStatusComponent implements OnInit {

	public reference: string;

	constructor(private route: ActivatedRoute, private router: Router, private cartService: CartService) { }

	ngOnInit(): void {
		this.reference = this.route.snapshot.queryParams.ref;
		if (this.reference === undefined || this.reference === null || this.reference.trim() === '') {
			this.router.navigateByUrl('404');
		}

		this.cartService.sendInvoiceByEmail(this.reference).subscribe(data => {
			console.log('email sent successfully')
		}, error => {
			console.log('email sending failed')
		});

	}

}
