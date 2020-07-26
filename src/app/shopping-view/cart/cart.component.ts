import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { CartDataService } from 'src/app/service/cart-data.service';
import { CartItem } from 'src/app/model/cart-item';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AppAuthService } from 'src/app/service/app-auth.service';
import { CartService } from 'src/app/ws/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-cart',
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
	showGuestButton: Boolean = true;
	cartItemList: CartItem[];
	total: number = 0.00;
	minTransactionValue: Number = 2000.0;
	modalRef: BsModalRef;

	constructor(public router: Router, private cart: CartDataService, private modalService: BsModalService,
		private appAuthService: AppAuthService, private cartSerice: CartService, private toastr: ToastrService) { }

	ngOnInit(): void {
		this.cartItemList = this.cart.cart.items as CartItem[];
		this.calculateTotal(this.cartItemList);

		this.cart.selectionStatus.subscribe((data: CartItem[]) => {
			this.cartItemList = data;
			this.calculateTotal(this.cartItemList);
		}, error => {

		});

		this.cartSerice.getMinTransactionValue().subscribe((data: any) => {
			this.minTransactionValue = data.min;
		})
	}

	deleteCartItem(item: CartItem) {
		this.cart.removeItem(item);
	}

	calculateTotal(items: CartItem[]) {
		this.total = 0;
		items.forEach(item => {
			this.total += item.product.unit_price_lkr.valueOf() * item.quantity.valueOf();
		});
	}

	changeItemQuantity(item: CartItem, value: number) {
		item.quantity = value;
		this.calculateTotal(this.cartItemList);
	}

	openModal(template: TemplateRef<any>) {
		if (this.minTransactionValue > this.total) {
			this.toastr.error('Minimum transaction value is ' + this.minTransactionValue,
				'Min Transaction Value');
			return;
		}

		if (!this.appAuthService.validSessionAvailable) {
			this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
		} else {
			this.router.navigateByUrl('checkout');
		}
	}

	ngOnDestroy() {
		if (this.modalRef !== undefined) {
			this.modalRef.hide();
		}
	}
}