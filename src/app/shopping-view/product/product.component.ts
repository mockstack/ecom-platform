import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/ws/product.service';
import { Product } from 'src/app/model/product';

@Component({
	selector: 'app-product',
	templateUrl: './product.component.html',
	styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

	@ViewChild('loading') loadingView: ElementRef;

	public productList: Product[] = [];
	private paramSubscription;
	public selectedCategoryName: String;
	public selectedCategoryId: String;

	constructor(private activatedRoute: ActivatedRoute, private router: Router, private productService: ProductService) {
	}

	ngOnInit(): void {
		this.paramSubscription = this.activatedRoute.params.subscribe(params => {
			this.selectedCategoryId = params['catid'];
			this.selectedCategoryName = params['cat'];

			if (this.selectedCategoryId != undefined) {
				this.productService.getProductsByCategoryId(this.selectedCategoryId).subscribe((data: Object[]) => {
					this.productList = [];
					data.forEach((val, index, array) => {
						//console.log(val);
						//console.log(index);
						//console.log(array);
						this.productList[index] = new Product().deserialize(val);
					});
					//this.productList = data;

					//Hide the loading view
					this.loadingView.nativeElement.remove();
				}, error=>{
					console.log(error.message);
				});
			}
		});
	}

	ngOnDestroy() {
		this.paramSubscription.unsubscribe();
	}

}
