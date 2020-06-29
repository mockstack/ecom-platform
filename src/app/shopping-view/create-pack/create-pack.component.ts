import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/ws/product.service';
import { Router } from '@angular/router';
import { AppAuthService } from 'src/app/service/app-auth.service';
import { ProductNameService } from 'src/app/service/product-name.service';
import { Pack } from 'src/app/model/pack';
import { PackItem } from 'src/app/model/pack-item';
import { PackService } from 'src/app/ws/pack.service';
import { CategoryService } from 'src/app/ws/category.service';
import { ProductCategory } from 'src/app/model/product-category';
import { Product } from 'src/app/model/product';

@Component({
	selector: 'app-create-pack',
	templateUrl: './create-pack.component.html',
	styleUrls: ['./create-pack.component.scss']
})
export class CreatePackComponent implements OnInit {

	public categoryList: ProductCategory[];
	public productList: Product[];
	public myPack: Pack[] = [];
	public myPackItems: PackItem[] = [];
	public packTitle: string = '';
	public packDescription: string = '';

	constructor(private productService: ProductService, private categoryService: CategoryService, public appAuthService: AppAuthService,
		private router: Router, private packService: PackService) {
		//this.categoryList = [];
		this.productList = [];
	}

	ngOnInit(): void {
		this.categoryService.getProductCategories().subscribe((data: ProductCategory[]) => {
			this.categoryList = data;
			this.productService.getAllProducts().subscribe((data: Product[]) => {
				this.productList = data;
			}, error => {
				// cannot load products
			});
		}, error => {
			// cannot load categories
		});
	}

	addProductToMyPack(product: any) {
		if (this.myPackItems.findIndex(item => item.product._id === product._id) == -1) {
			let packItem = new PackItem(product, 1);
			this.myPackItems.push(packItem);
		}
	}

	removeProductFromMyPack(product: any) {
		this.myPackItems = this.myPackItems.filter(item => item !== product);
	}

	saveMyPack() {
		console.log(this.myPackItems);
		const pack = new Pack(this.packTitle, this.packDescription, this.appAuthService.loggedUser._id, true, this.myPackItems);
		this.packService.addPrivatePack(pack).subscribe(data => {
			this.router.navigateByUrl('pack');
		}, error => {
			console.log(error)
		});
	}

}
