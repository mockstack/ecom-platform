import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { CartService } from 'src/app/ws/cart.service';
import Key from 'src/app/utils/key';
import { CartDataService } from 'src/app/service/cart-data.service';
import { ToastrService } from 'ngx-toastr';
import { ErrorLogService } from 'src/app/ws/error-log.service';
import { environment } from 'src/environments/environment';
import { ErrorLog } from 'src/app/model/error-log';
import { ReportGenerateService } from 'src/app/ws/report-generate.service';

@Component({
	selector: 'app-checkout-status',
	templateUrl: './checkout-status.component.html',
	styleUrls: ['./checkout-status.component.scss']
})
export class CheckoutStatusComponent implements OnInit {

	public reference: string;
	public clientRef: String;
	public requestId: String;
	public formData: any;
	public inProgress: Boolean = true;

	constructor(private route: ActivatedRoute, private router: Router, private cartService: CartService,
		public cartDataService: CartDataService, private toast: ToastrService, private errorLogService: ErrorLogService,
		private reportService: ReportGenerateService) { }

	ngOnInit(): void {
		this.route.queryParamMap.subscribe((params: any) => {
			//response from the payment gateway
			this.clientRef = params.params.clientRef;
			this.requestId = params.params.reqid;
		});

		this.reference = this.route.snapshot.queryParams.ref;
		this.formData = JSON.parse(localStorage.getItem(Key.LS_CART));

		if (this.reference === null || this.reference === undefined) {
			//Credit card payment
			//TO BE IMPLEMENTED
		} else {
			//Cash on delivery option
			this.cartService.validateReferenceNumber(this.reference).subscribe((data: any) => {
				if (data.valid) {
					this.completeTransaction(this.formData, this.reference);
				} else {
					this.toast.error('Invalid reference number', 'Validation')
				}
			});
			
		}
	}

	/**
	 * Complete the transaction by adding a new order and sending the invoice to the customer.
	 * @param cartData cart related information.
	 * @param ref transaction reference number.
	 */
	private completeTransaction(cartData: any, ref: String) {
		//insert document into the order table.
		this.cartService.checkOut(cartData).subscribe((data: any) => {
			this.inProgress = false;


			this.reportService.generateInvoice(ref).subscribe(data => {

				this.cartService.sendInvoiceByEmail(ref).subscribe(data => {
					console.log('email sent successfully');
					this.cartDataService.completeCheckout();
				}, error => {
					// error will be kept for future usage.
					let errorData: ErrorLog = new ErrorLog();
					errorData.message = 'Cannot send email for the transaction invoice';
					errorData.category = 'Email'
					errorData.data = error;
					this.errorLogService.saveError(errorData).subscribe();
				});
			}, error => {
				console.log(error);
				// error will be kept for future usage.
				let errorData: ErrorLog = new ErrorLog();
				errorData.message = 'Cannot generate invoice for the transaction';
				errorData.category = 'Invoice'
				errorData.data = error;
				this.errorLogService.saveError(errorData).subscribe();
			});


		}, error => {
			this.toast.error(error.error, 'Transaction Failed');
			let errorData: ErrorLog = new ErrorLog();
			errorData.message = 'Checkout failed';
			errorData.category = 'Checkout'
			errorData.data = error;
			this.errorLogService.saveError(errorData).subscribe();
		});
	}

}
