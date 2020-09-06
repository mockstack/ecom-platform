import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/product';
import { environment } from 'src/environments/environment';
import { CartDataService } from 'src/app/service/cart-data.service';
import { CartItem } from 'src/app/model/cart-item';
import { GoogleAnalyticsService } from 'src/app/service/google-analytics.service';

@Component({
	selector: 'app-product-grid-item',
	templateUrl: './product-grid-item.component.html',
	styleUrls: ['./product-grid-item.component.scss']
})
export class ProductGridItemComponent implements OnInit {

	@Input() product: Product;

	serverUrl = environment.apiUrl;

	constructor(private router: Router, private cart: CartDataService, private googleAnalyticsService: GoogleAnalyticsService) { }

	ngOnInit(): void {
	}

	productImageClickEvent(product) {
		this.googleAnalyticsService.eventEmitter("view_product", "shop", "view_product_detail", "product_name", product.name);
		this.router.navigate(['/product', product._id]);
	}
}
