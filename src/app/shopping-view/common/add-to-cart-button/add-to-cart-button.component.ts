import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
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
	private cartItem: CartItem;
	public itemCount: number = 1;

	constructor(private cartDataService: CartDataService, private toast: ToastrService) { }

	ngOnInit(): void {
		//Get the item if it is already in the cart.
		let cartItems = this.cartDataService.cart.items.filter((item: IBuyItem) => {
			return item.buyItem.product._id === this.product._id;
		});

		if (cartItems.length > 0) {
			this.alreadyAdded = true;
			this.itemCount = cartItems[0].buyItem.quantity;
		}

		// item is not in the cart but it is added later.
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

	/**Add product to the cart with count of 1 */
	addProduct() {
		this.cartItem = new CartItem(this.product, this.itemCount);
		this.cartDataService.addItem(this.cartItem);
	}

	/**Deducting item count by one */
	deductItems() {
		this.itemCount--;
		if(this.itemCount === 0) {
			this.cartDataService.removeItem(this.product._id);
			this.alreadyAdded = false;
		} else {
			this.cartDataService.updateQuantiryByProductId(this.product._id.valueOf(), this.itemCount);
		}
	}

	/**Increase item count by 1 */
	addItems() {
		this.itemCount++;
		this.cartDataService.updateQuantiryByProductId(this.product._id.valueOf(), this.itemCount);
	}

}
