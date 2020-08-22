import { Component, OnInit, Input } from '@angular/core';
import { CartDataService } from 'src/app/service/cart-data.service';
import { IBuyItem } from 'src/app/model/ibuy-item';
import { CartItem } from 'src/app/model/cart-item';
import { Product } from 'src/app/model/product';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-add-to-cart-button',
	templateUrl: './add-to-cart-button.component.html',
	styleUrls: ['./add-to-cart-button.component.scss']
})
export class AddToCartButtonComponent implements OnInit {
	@Input() product: Product;
	public alreadyAdded: Boolean = false;

	constructor(private cartDataService: CartDataService, private toast: ToastrService) { }

	ngOnInit(): void {
		let item = this.cartDataService.cart.items.filter((item: IBuyItem) => {
			return item._id === this.product._id;
		});

		if (item.length > 0) {
			this.alreadyAdded = true;
		}

		this.cartDataService.selectionStatus.subscribe((data: IBuyItem[]) => {
			const items = data.filter(item => {
				return item.product._id === this.product._id;
			});
			if (items.length > 0) {
				this.alreadyAdded = true;
			} else {
				this.alreadyAdded = false;
			}
		}, error => {

		});
	}

	buttonClickEvent() {
		if (this.alreadyAdded) {
			this.cartDataService.removeItem(this.product._id);
			this.alreadyAdded = false;
			console.log('remove item ' + this.product.name);
			return;
		}

		this.cartDataService.addItem(new CartItem(this.product, 1));
		console.log('add item ' + this.product.name);
	}

}
