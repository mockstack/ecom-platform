import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router'

@Component({
	selector: 'app-product-type-preview',
	templateUrl: './product-type-preview.component.html',
	styleUrls: ['./product-type-preview.component.scss']
})
export class ProductTypePreviewComponent implements OnInit {
	@Input() productType: string;
	newItemList: number[] = [23, 4, 3, 6];
	constructor(private router: Router) { }

	ngOnInit(): void {
	}

	showAllProductsByType() {
		this.router.navigateByUrl('products');
	}

	ngOnChanges(changes: SimpleChanges) {
	}
}
