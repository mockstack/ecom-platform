import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/ws/product.service';
import { environment } from 'src/environments/environment';
import { CartDataService } from 'src/app/service/cart-data.service';
import { CartItem } from 'src/app/model/cart-item';
import { IBuyItem } from 'src/app/model/ibuy-item';

@Component({
	selector: 'app-product-detail',
	templateUrl: './product-detail.component.html',
	styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

	private productId: string;
	public product: Product;
	public quantity: number = 1;
	public serverUrl = environment.apiUrl;
	public isAlreadyAdded: boolean;

	constructor(private router: Router, private activatedRoute: ActivatedRoute,
		private productService: ProductService, private cartDataService: CartDataService) { }

	ngOnInit(): void {
		this.activatedRoute.params.subscribe(params => {
			this.productId = params['id'];

			let cartItems = this.cartDataService.cart.items.filter((item: IBuyItem) => {
				return item.buyItem.product._id === this.productId;
			});

			if (cartItems.length === 1) {
				this.product = cartItems[0].buyItem.product;
				this.quantity = cartItems[0].buyItem.quantity;
				this.isAlreadyAdded = true;
			} else {
				this.productService.getProduct(this.productId).subscribe((product: Product) => {
					this.quantity = 1;
					this.product = product;
					this.isAlreadyAdded = false;
				}, error => {
					this.router.navigateByUrl('404');
				});
			}
		});
	}

	increaseQuantity() {
		this.quantity++;
		this.cartDataService.updateQuantiryByProductId(this.product._id.valueOf(), this.quantity);
	}

	decreaseQuantity() {
		this.quantity--;
		if (this.quantity <= 1) {
			this.quantity = 1;
		}
		this.cartDataService.updateQuantiryByProductId(this.product._id.valueOf(), this.quantity);
	}

	addItemToCart(product: Product) {
		this.cartDataService.addItem(new CartItem(product, this.quantity));
		this.isAlreadyAdded = true;
	}

	removeItemFromCart() {
		this.cartDataService.removeItem(this.productId);
		this.isAlreadyAdded = false;
		this.quantity = 1;
	}
}
