import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
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
		let clientRef: String;
		let requestId: String;

		this.route.queryParamMap.subscribe((params: any) => {
			//response from the payment gateway
			clientRef = params.params.clientRef;
			requestId = params.params.reqid;
		});


		//this.reference = this.route.snapshot.queryParams.ref;

		//const snapshot: RouterStateSnapshot = this.router.routerState.snapshot;
		//console.log(snapshot);  // <-- hope it helps

		//if (this.reference === undefined || this.reference === null || this.reference.trim() === '') {
			//this.router.navigateByUrl('404');
		//}

		/*this.cartService.sendInvoiceByEmail(this.reference).subscribe(data => {
			console.log('email sent successfully')
		}, error => {
			console.log('email sending failed')
		});*/
	}

}
