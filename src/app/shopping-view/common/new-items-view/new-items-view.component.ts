import { Component, OnInit } from '@angular/core';
import { PackService } from 'src/app/ws/pack.service';
import { Pack } from 'src/app/model/pack';
import { Router } from '@angular/router';

@Component({
	selector: 'app-new-items-view',
	templateUrl: './new-items-view.component.html',
	styleUrls: ['./new-items-view.component.scss']
})
export class NewItemsViewComponent implements OnInit {

	constructor(private packService: PackService, private router: Router) { }

	public imageList: String[] = ["./assets/img/pack/1.jpg",
		"./assets/img/pack/2.jpg", "./assets/img/pack/3.jpg", "./assets/img/pack/4.jpg"];
	public packList: Object[] = [];

	ngOnInit(): void {
		this.packService.getDefaultPackForPreview().subscribe((data: Object[]) => {
			this.packList = data;
		})
	}

	showAllPacks() {
		this.router.navigateByUrl('pack')
	}

}
