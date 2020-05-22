import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, RoutesRecognized } from '@angular/router';
import { ProductService } from 'src/app/ws/product.service';

@Component({
	selector: 'app-product',
	templateUrl: './product.component.html',
	styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

	public productList;
	private paramSubscription;

	constructor(private activatedRoute: ActivatedRoute, private router: Router, private productService: ProductService) {
	}

	ngOnInit(): void {
		this.paramSubscription = this.activatedRoute.params.subscribe(params => {
			let catId = params['catid'];

			if (catId != undefined) {
				this.productService.getProductsByCategoryId(catId).subscribe((data: Object[]) => {
					this.productList = data;
				});
			}
		});
	}

	ngOnDestroy() {
		this.paramSubscription.unsubscribe();
	}

}
