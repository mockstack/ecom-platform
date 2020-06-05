import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/ws/product.service';
import { Router } from '@angular/router';
import { AppAuthService } from 'src/app/service/app-auth.service';
import { ProductNameService } from 'src/app/service/product-name.service';

@Component({
	selector: 'app-create-pack',
	templateUrl: './create-pack.component.html',
	styleUrls: ['./create-pack.component.scss']
})
export class CreatePackComponent implements OnInit {

	public categoryList;
	public productList;
	public myPack = [];

	constructor(private productService: ProductService, public appAuthService: AppAuthService,
		private router: Router, private productNameService: ProductNameService) {
		this.categoryList = this.productNameService.categoryList;
		this.productList = this.productNameService.productList;
	}

	ngOnInit(): void {
		console.log(this.productNameService.productList)
		console.log(this.productNameService.categoryList)
	}

	addProductToMyPack(product: any) {
		this.myPack.push(product);
	}

	removeProductFromMyPack(product: any) {
		this.myPack = this.myPack.filter(item => item !== product);
	}

}
