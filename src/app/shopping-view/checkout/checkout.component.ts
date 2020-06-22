import { Component, OnInit } from '@angular/core';
import { CartDataService } from 'src/app/service/cart-data.service';
import { CartItem } from 'src/app/model/cart-item';

@Component({
	selector: 'app-checkout',
	templateUrl: './checkout.component.html',
	styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
	cartItems: CartItem[];
	total: number = 0.00;

	constructor(private cart: CartDataService) { }

	ngOnInit(): void {
		this.cartItems = this.cart.cart.items;
		this.calculateTotal(this.cartItems);
	}

	calculateTotal(items: CartItem[]) {
		this.total = 0;
		items.forEach(item => {
			this.total += item.product.unit_price_lkr.valueOf() * item.quantity.valueOf();
		});
	}

}
