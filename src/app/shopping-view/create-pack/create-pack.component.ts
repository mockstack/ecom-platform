import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/ws/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppAuthService } from 'src/app/service/app-auth.service';
import { ProductNameService } from 'src/app/service/product-name.service';
import { Pack } from 'src/app/model/pack';
import { PackItem } from 'src/app/model/pack-item';
import { PackService } from 'src/app/ws/pack.service';
import { CategoryService } from 'src/app/ws/category.service';
import { ProductCategory } from 'src/app/model/product-category';
import { Product } from 'src/app/model/product';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-create-pack',
	templateUrl: './create-pack.component.html',
	styleUrls: ['./create-pack.component.scss']
})
export class CreatePackComponent implements OnInit {

	public categoryList: ProductCategory[];
	public productList: Product[];
	public myPack: Pack;
	public myPackItems: PackItem[] = [];
	public packTitle: string = '';
	public packDescription: string = '';
	private packId: String;

	constructor(private productService: ProductService, private categoryService: CategoryService,
		public appAuthService: AppAuthService, private router: Router, private packService: PackService,
		private route: ActivatedRoute, private toast: ToastrService) {
		//this.categoryList = [];
		this.productList = [];
	}

	ngOnInit(): void {
		//edit packs
		this.route.paramMap.subscribe(params => {
			this.packId = params.get("packId");
			if (this.packId !== null) {
				this.packService.getPrivatePack(this.appAuthService.loggedUser._id, this.packId).subscribe((data: Pack) => {
					this.myPack = data;
					this.packTitle = data.name;
					this.packDescription = data.description;
					for (const item of data.packItems) {
						this.myPackItems.push(new PackItem(item.product, item.quantity))
					}
				}, error => {
					console.error(error);
				});
			}
		});

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

	saveMyPack() {;
		if (this.packId !== undefined && this.packId !== null) {
			//update existing pack
			const pack = new Pack(this.packTitle, this.packDescription, this.appAuthService.loggedUser._id, true, this.myPackItems, this.packId);
			this.packService.updatePrivatePack(pack, this.appAuthService.loggedUser._id, this.packId).subscribe(data => {
				this.toast.success('Update success', 'Update')
			}, error => {
				this.toast.error('Update failed', 'Update')
			});
		} else {
			//Add new pack
			const pack = new Pack(this.packTitle, this.packDescription, this.appAuthService.loggedUser._id, true, this.myPackItems);
			this.packService.addPrivatePack(pack, this.appAuthService.loggedUser._id).subscribe(data => {
				this.router.navigateByUrl('pack');
			}, error => {
				console.log(error)
			});
		}

	}

}
