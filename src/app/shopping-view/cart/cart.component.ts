import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartDataService } from 'src/app/service/cart-data.service';
import { CartItem } from 'src/app/model/cart-item';
import { Product } from 'src/app/model/product';

const product = new Product();
product.name = "THis is the name of the prodcuts"
product._id = '2321321';
product.unit_price_lkr = 12.50;

const itemList = [new CartItem(product, 3)];


@Component({
	selector: 'app-cart',
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

	cartItemList: CartItem[];// = itemList;
	total: number = 0.00;

	constructor(public router: Router, private cart: CartDataService) { }

	ngOnInit(): void {
		this.cartItemList = this.cart.cart.items;
		this.calculateTotal(this.cartItemList);

		this.cart.selectionStatus.subscribe( (data: CartItem[]) => {
			this.cartItemList = data;
			this.calculateTotal(this.cartItemList);
		}, error => {

		});
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
}