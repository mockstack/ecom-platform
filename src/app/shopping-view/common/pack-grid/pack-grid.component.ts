import { Component, OnInit, Output, Input, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { PackItem } from 'src/app/model/pack-item';
import { Pack } from 'src/app/model/pack';
import { CartService } from 'src/app/ws/cart.service';
import { CartDataService } from 'src/app/service/cart-data.service';
import { CartItem } from 'src/app/model/cart-item';

@Component({
	selector: 'app-pack-grid',
	templateUrl: './pack-grid.component.html',
	styleUrls: ['./pack-grid.component.scss']
})
export class PackGridComponent implements OnInit {

	@Input() pack: any;
	selectedItems = [];
	modalRef: BsModalRef;

	constructor(private router: Router, private modalService: BsModalService, private cartDataService: CartDataService) { }

	ngOnInit(): void {
	}

	showCheckout(pack: Pack) {
		for(let item of pack.packItems) {
			console.log(item)
			this.cartDataService.addItem(new CartItem(item.product, item.quantity));
		}
		
	}

	showPackEdit() {
		this.router.navigateByUrl("detail");
	}

	showModal(template: TemplateRef<any>, pack: any) {
		this.selectedItems = pack.packItems;
		this.modalRef = this.modalService.show(template);
	}

}
