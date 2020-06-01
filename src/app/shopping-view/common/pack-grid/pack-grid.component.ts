import { Component, OnInit, Output, Input, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
	selector: 'app-pack-grid',
	templateUrl: './pack-grid.component.html',
	styleUrls: ['./pack-grid.component.scss']
})
export class PackGridComponent implements OnInit {

	@Input() pack: any;
	selectedItems = [];
	modalRef: BsModalRef;

	constructor(private router: Router, private modalService: BsModalService) { }

	ngOnInit(): void {
	}

	showCheckout() {
		this.router.navigateByUrl("checkout");
	}

	showPackEdit() {
		this.router.navigateByUrl("pack/detail");
	}

	showModal(template: TemplateRef<any>, pack: any) {
		this.selectedItems = pack.packItems;
		this.modalRef = this.modalService.show(template);
	}

}
