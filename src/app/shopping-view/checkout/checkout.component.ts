import { Component, OnInit } from '@angular/core';
import { CartDataService } from 'src/app/service/cart-data.service';
import { CartItem } from 'src/app/model/cart-item';
import { DeliveryAreaService } from 'src/app/ws/delivery-area.service';
import { District } from 'src/app/model/district';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CartService } from 'src/app/ws/cart.service';
import { Router } from '@angular/router';
import { AppAuthService } from 'src/app/service/app-auth.service';
import { ToastrService } from 'ngx-toastr';
import { DeliveryArea } from 'src/app/model/delivery-area';
import { UserProfileService } from 'src/app/ws/user-profile.service';
import { AppUserProfile } from 'src/app/model/app-user-profile';
import { environment } from 'src/environments/environment';
import { PgService } from 'src/app/ws/pg.service';
import Key from 'src/app/utils/key';
//payment gateway
declare const loadPaycorpPayment: any;

@Component({
	selector: 'app-checkout',
	templateUrl: './checkout.component.html',
	styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
	cartItems: CartItem[];
	total: number = 0.00;
	deliveryCityList: DeliveryArea[];//dilivery available cities
	districtList: District[];// dilivery available districts
	checkoutForm: FormGroup;
	submitted = false;
	selectedDistrict: District;
	selectedCity: DeliveryArea;
	deliveryAreaList: DeliveryArea[];
	public userProfile: AppUserProfile;

	constructor(public cart: CartDataService, private deliveryAreaService: DeliveryAreaService,
		private formBuilder: FormBuilder, private cartService: CartService, private router: Router,
		private authService: AppAuthService, private toastr: ToastrService, private profileService: UserProfileService,
		private cartDataService: CartDataService, private pgService: PgService) {
		this.deliveryCityList = [];
		this.districtList = [];
		this.deliveryAreaList = [];
	}

	ngOnInit(): void {
		this.checkoutForm = this.formBuilder.group({
			firstName: ['', [Validators.required]],
			lastName: ['', Validators.required],
			email: ['', Validators.required],
			district: ['', Validators.required],
			city: ['', Validators.required],
			address: ['', Validators.required],
			optionalAddress: ['', !Validators.required],
			payment: ['cod', Validators.required],
			tcAccept: ['', Validators.requiredTrue],
			contact_number: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]]
		});

		this.cartItems = this.cart.cart.items as CartItem[];
		this.calculateTotal(this.cartItems);

		//get delivery area then we can set the charges
		this.deliveryAreaService.getDeliveryAreas().subscribe((data: DeliveryArea[]) => {
			this.deliveryAreaList = data;
		});

		this.deliveryAreaService.getDeliveryDistrictList().subscribe((data: District[]) => {
			this.districtList = data;
		})

		// when user reload or directly navigating to this page
		this.authService.sessionStatus.subscribe((validity: Boolean) => {
			if (validity) {
				this.profileService.getProfileByUserId(this.authService.loggedUser._id).subscribe((data: AppUserProfile) => {
					if (data === null) {
						return;
					}
					this.userProfile = data;
					this.checkoutForm.patchValue({
						firstName: this.userProfile.first_name,
						lastName: this.userProfile.last_name,
						email: this.userProfile.email,
						address: this.userProfile.address,
						optionalAddress: this.userProfile.optional_address,
						district: this.userProfile.district._id,
						city: this.userProfile.city._id,
						contact_number: this.userProfile.contact_number
					});
					this.selectedDistrict = this.userProfile.district;
					//this.selectedCity = this.userProfile.city;

					// get city list for the profile
					this.deliveryAreaService.getDeliveryCityByDistrictId(this.selectedDistrict._id).subscribe((data: DeliveryArea[]) => {
						this.deliveryCityList = data;

						//set delivery cost for the selected city
						//this.deliveryAreaList.filter(item => item.city._id === cityId)[0];
						this.selectedCity = this.deliveryCityList.filter(item => item.city._id === this.userProfile.city._id)[0];
						this.addDeliveryCharges();
					});
				}, error => {
					console.log(error);
				});
			} else {
				//this.router.navigateByUrl('/');
			}
		});

		//loading the data from the service
		this.cartDataService.selectionStatus.subscribe((data: CartItem[]) => {
			if (data.length === 0) {
				//this.router.navigateByUrl('/');
			}
			this.cartItems = data;
			this.calculateTotal(this.cartItems);
		}, error => {

		});

	}

	get formField() {
		return this.checkoutForm.controls;
	}

	calculateTotal(items: CartItem[]) {
		this.total = 0;
		items.forEach(item => {
			this.total += item.product.unit_price_lkr.valueOf() * item.quantity.valueOf();
		});
	}

	onDistrictChange(districtId: any) {
		this.deliveryCityList = [];
		this.selectedDistrict = this.districtList.filter(item => item._id === districtId)[0];
		this.deliveryAreaService.getDeliveryCityByDistrictId(districtId).subscribe((data: DeliveryArea[]) => {
			this.deliveryCityList = data;
		}, error => {
			console.log(error)
		});
	}

	onCityChange(cityId: any) {
		//reduct the previously added delivery charge
		if (this.selectedCity !== undefined) {
			this.total -= this.selectedCity.delivery_charge.valueOf();
		}
		this.selectedCity = this.deliveryAreaList.filter(item => item.city._id === cityId)[0];
		this.addDeliveryCharges();
	}

	addDeliveryCharges() {
		this.cart.deliveryCharge = this.selectedCity.delivery_charge.valueOf();
		this.total += this.cart.deliveryCharge;
	}

	submitForm(values: any) {
		this.submitted = true;

		if (this.checkoutForm.invalid) {
			return;
		}

		const FORM = this.checkoutForm.value;
		let formData: any = {
			first_name: FORM.firstName,
			last_name: FORM.lastName,
			email: FORM.email,
			district: this.selectedDistrict._id,
			city: this.selectedCity.city._id,
			street_address: FORM.address,
			optional_address: FORM.optionalAddress,
			payment_method: FORM.payment,
			cart: this.cart.cart._id,
			contact_number: FORM.contact_number,
			delivery_charge: this.cart.deliveryCharge
		}

		if (this.authService.validSessionAvailable) {
			formData.user_id = this.authService.loggedUser._id;
		}

		//mark the cart as checked out.
		this.cartService.cartCheckout(this.cart.cart._id).subscribe((cData: any) => {
			formData.ref = cData.ref;
			// save the current checkout form information in the local storage
			// this data will be accessed from the status component and will delete
			// after completing the transaction. IF the data did not deleted, new data
			// will overwrite the existing data.
			localStorage.setItem(Key.LS_CART, JSON.stringify(formData));
			if (formData.type === 'cc' || formData.type === 'dc') {
				const paymentObject = this.buildPayment(this.total, 'LKR', cData.ref);
				//save the payment object in the database.
				this.pgService.savePaymentObject(paymentObject).subscribe(data => {
					// open the payment window
					loadPaycorpPayment(paymentObject);
				}, error => {
					this.toastr.error(error, 'Save Payment Infor');
				});
			} else {
				this.router.navigate(['/costatus'], { queryParams: { ref: cData.ref } });
			}

			// Old logic
			//insert document into the order table.
			/*this.cartService.checkOut(data).subscribe((data: any) => {
				this.cartDataService.completeCheckout();
				if (data.type === 'cc' || data.type === 'dc') {} else {}
			}, error => {
				this.toastr.error(error.error, 'Transaction Failed');
			});*/
		}, error => {
			this.toastr.error(error.error, 'Cart update failed');
		});
	}

	buildPayment(amount: Number, currency: String, ref: String): any {
		return {
			clientId: environment.pgClientId,
			paymentAmount: amount,
			currency: currency,
			returnUrl: environment.pgReturnUrl,
			clientRef: ref,
			comment: 'Payment for the cart id = ' + this.cart.cart._id
		};
	}

}
