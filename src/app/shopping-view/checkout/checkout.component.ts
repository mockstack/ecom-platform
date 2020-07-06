import { Component, OnInit } from '@angular/core';
import { CartDataService } from 'src/app/service/cart-data.service';
import { CartItem } from 'src/app/model/cart-item';
import { DeliveryAreaService } from 'src/app/ws/delivery-area.service';
import { District } from 'src/app/model/district';
import { City } from 'src/app/model/city';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CartService } from 'src/app/ws/cart.service';
import { Router } from '@angular/router';
import { AppAuthService } from 'src/app/service/app-auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-checkout',
	templateUrl: './checkout.component.html',
	styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
	cartItems: CartItem[];
	total: number = 0.00;
	cityList: City[];//dilivery available cities
	districtList: District[];// dilivery available districts
	checkoutForm: FormGroup;
	submitted = false;
	selectedDistrict: District;
	selectedCity: City;

	constructor(private cart: CartDataService, private delArea: DeliveryAreaService, private formBuilder: FormBuilder,
		private cartService: CartService, private router: Router, private authService: AppAuthService,
		private toastr: ToastrService) {
		this.cityList = [];
		this.districtList = [];
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
			payment: ['cc', Validators.required]
		});

		this.cartItems = this.cart.cart.items as CartItem[];
		this.calculateTotal(this.cartItems);

		this.delArea.getDeliveryCities().subscribe((data: any) => {
			this.cityList = data.city;
			this.districtList = this.getDistrictList(this.cityList);
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
		this.selectedDistrict = JSON.parse(district);
	}

	onCityChange(city: any) {
		this.selectedCity = JSON.parse(city);
	}

	/**
	 * Get unique list of districts
	 * @param cityList delivery city list
	 */
	private getDistrictList(cityList: City[]): District[] {
		let districtIds = [];
		let districtList: District[] = [];
		cityList.map(function (val, index) {
			if (districtIds.indexOf(val.district_id._id) === -1) {
				districtList.push(val.district_id);
			}
			districtIds.push(val.district_id._id);
			return;
		});

		return districtList;
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
			cart: this.cart.productIdList
		}

		if (this.authService.validSessionAvailable) {
			data.user_id = this.authService.loggedUser._id;
		}

		this.cartService.checkOut(data).subscribe((data: any) => {
			if (data.type === 'cc' || data.type === 'dc') {
				//must redirected to the payment gateway.
			} else {
				// cod(cash on delivery will be redirected to the success page)
				this.router.navigate(['/costatus'], {queryParams: {ref: data.ref}});
			}
		}, error => {
			this.toastr.error(error.error, 'Transaction Failed');
		});

	}

}
