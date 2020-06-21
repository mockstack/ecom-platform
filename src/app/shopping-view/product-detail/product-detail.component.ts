import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/ws/product.service';
import { environment } from 'src/environments/environment';
import { CartDataService } from 'src/app/service/cart-data.service';
import { CartItem } from 'src/app/model/cart-item';

@Component({
	selector: 'app-product-detail',
	templateUrl: './product-detail.component.html',
	styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

	productId: string;
	product: Product;
	quantity: number = 1;
	serverUrl = environment.apiUrl;

	constructor(private router: Router, private activatedRoute: ActivatedRoute,
		private productService: ProductService, private cartDataService: CartDataService) { }

	ngOnInit(): void {
		this.activatedRoute.params.subscribe(params => {
			this.productId = params['id'];
			console.log(this.productId)

			this.productService.getProduct(this.productId).subscribe((product: Product) =>{
				this.product = product;
			}, error=> {
				this.router.navigateByUrl('404');
			})
		});
	}

	increaseQuantity() {
		this.quantity++;
	}

	decreaseQuantity() {
		this.quantity--;
		if (this.quantity <= 1) {
			this.quantity = 1;
		}
	}

	addItemToCart(product: Product) {
		this.cartDataService.addItem(new CartItem( undefined, product._id, this.quantity));
	}
}
