import { Component, OnInit, Output, Input, ViewChild, ElementRef, TemplateRef, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { PackItem } from 'src/app/model/pack-item';
import { Pack } from 'src/app/model/pack';
import { CartService } from 'src/app/ws/cart.service';
import { CartDataService } from 'src/app/service/cart-data.service';
import { CartItem } from 'src/app/model/cart-item';
import { PackService } from 'src/app/ws/pack.service';
import { AppAuthService } from 'src/app/service/app-auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-pack-grid',
	templateUrl: './pack-grid.component.html',
	styleUrls: ['./pack-grid.component.scss']
})
export class PackGridComponent implements OnInit {

	@Input() pack: any;
	selectedItems = [];
	modalRef: BsModalRef;
	public isPrivatePack: Boolean = false;
	@Output() packModified: EventEmitter<any> = new EventEmitter<any>();

	constructor(private router: Router, private modalService: BsModalService, private cartDataService: CartDataService,
		private packService: PackService, public appAuthService: AppAuthService, private toast: ToastrService) { }

	ngOnInit(): void {
		if (this.pack.owner !== undefined) {
			this.isPrivatePack = true;
		}
	}

	showCheckout(pack: Pack) {
		let list: CartItem[] = [];
		for(let item of pack.packItems) {
			list.push(new CartItem(item.product, item.quantity));
		}

		this.cartDataService.addItems(list);
		
	}

	showPackEdit() {
		this.router.navigateByUrl("detail");
	}

	showModal(template: TemplateRef<any>, pack: any) {
		this.selectedItems = pack.packItems;
		this.modalRef = this.modalService.show(template);
	}

	editPack() {
		this.router.navigateByUrl('/create/' + this.pack._id);
	}

	makePrivatePack() {
		let pItems:PackItem[] = [];
		for (const item of this.pack.packItems) {
			pItems.push(new PackItem(item.product, item.quantity));
		}
		const pack = new Pack(this.pack.name, this.pack.description, this.appAuthService.loggedUser._id, true, pItems);
		this.packService.addPrivatePack(pack, this.appAuthService.loggedUser._id).subscribe((data: Pack) => {
			this.toast.success('Successfully customized', 'Customize');
			this.packModified.emit(data);
		}, error => {
			this.toast.error('Cannot customize', 'Customize')
		})
	}

	deletePrivatePack() {
		this.packService.deletePrivatePack(this.appAuthService.loggedUser._id, this.pack._id).subscribe(data=>{
			this.toast.success('Successfully deleted', 'Delete');
			this.packModified.emit(this.pack);
		}, error => {
			this.toast.error('Cannot delete', 'Delete')
		})
	}

}
