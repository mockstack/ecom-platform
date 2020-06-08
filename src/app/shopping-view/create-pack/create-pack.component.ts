import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/ws/product.service';
import { Router } from '@angular/router';
import { AppAuthService } from 'src/app/service/app-auth.service';
import { ProductNameService } from 'src/app/service/product-name.service';
import { Pack } from 'src/app/model/pack';
import { PackItem } from 'src/app/model/pack-item';
import { PackService } from 'src/app/ws/pack.service';

@Component({
	selector: 'app-create-pack',
	templateUrl: './create-pack.component.html',
	styleUrls: ['./create-pack.component.scss']
})
export class CreatePackComponent implements OnInit {

	public categoryList;
	public productList;
	public myPack: Pack[] = [];
	public myPackItems: PackItem[] = [];
	public packTitle: string = '';
	public packDescription: string = '';

	constructor(private productService: ProductService, public appAuthService: AppAuthService,
		private router: Router, private productNameService: ProductNameService, private packService: PackService) {
		this.categoryList = this.productNameService.categoryList;
		this.productList = this.productNameService.productList;
	}

	ngOnInit(): void {
		console.log(this.productNameService.productList)
		console.log(this.productNameService.categoryList)
	}

	addProductToMyPack(product: any) {
		if (this.myPackItems.findIndex(item => item === product) == -1) {
			let packItem = new PackItem(product._id, product.name, 1);
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
