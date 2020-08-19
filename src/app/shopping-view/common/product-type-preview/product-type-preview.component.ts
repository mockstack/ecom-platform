import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router'
import { ProductService } from 'src/app/ws/product.service';
import { Product } from 'src/app/model/product';

@Component({
	selector: 'app-product-type-preview',
	templateUrl: './product-type-preview.component.html',
	styleUrls: ['./product-type-preview.component.scss']
})
export class ProductTypePreviewComponent implements OnInit {
	@Input() productTypeId: string;
	@Input() category: string;
	public productList: Product[] = [];
	
	constructor(private router: Router, private productService: ProductService) { }

	ngOnInit(): void {
		this.productService.getProductForPreviewByCategoryId(this.productTypeId).subscribe((data: Object[]) => {
			this.productList = [];
			data.forEach((val, index, array) => {
				this.productList[index] = new Product().deserialize(val);
			});
			console.log(this.productList[0].category)
		}, error=>{
			console.log(error.message);
		});
	}

	showAllProductsByType() {
		if (this.productList !== []) {
			let catObj: any = this.productList[0].category;
			this.router.navigateByUrl('products/' + catObj.name + '/' + catObj._id);
		}
	}

	ngOnChanges(changes: SimpleChanges) {
	}
}
