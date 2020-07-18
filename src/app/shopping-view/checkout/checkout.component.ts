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
		private cartDataService: CartDataService) {
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
			payment: ['cc', Validators.required],
			tcAccept: ['', Validators.requiredTrue]
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
						city: this.userProfile.city._id
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
			}
		});

		//loading the data from the service
		this.cartDataService.selectionStatus.subscribe((data: CartItem[]) => {
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

	onDistrictChange(district: any) {
		this.deliveryCityList = [];
		this.selectedDistrict = JSON.parse(district);
		this.deliveryAreaService.getDeliveryCityByDistrictId(this.selectedDistrict._id).subscribe((data: DeliveryArea[]) => {
			this.deliveryCityList = data;
		}, error => {
			console.log(error)
		});
	}

	onCityChange(cityId: any) {
		//reduct the previously added delivery charge
		this.total -= this.selectedCity.delivery_charge.valueOf();
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
		let data: any = {
			first_name: FORM.firstName,
			last_name: FORM.lastName,
			email: FORM.email,
			district: this.selectedDistrict._id,
			city: this.selectedCity._id,
			street_address: FORM.address,
			optional_address: FORM.optionalAddress,
			payment_method: FORM.payment,
			cart: this.cart.cart._id
		}

		if (this.authService.validSessionAvailable) {
			data.user_id = this.authService.loggedUser._id;
		}

		this.cartService.checkOut(data).subscribe((data: any) => {
			if (data.type === 'cc' || data.type === 'dc') {
				//must redirected to the payment gateway.
				//transaction data must be stored in a separate collection
				//for auditing purposes.
			} else {
				// cod(cash on delivery will be redirected to the success page)
				this.router.navigate(['/costatus'], { queryParams: { ref: data.ref } });
			}
		}, error => {
			this.toastr.error(error.error, 'Transaction Failed');
		});

	}

}
