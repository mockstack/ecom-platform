import { Component, OnInit } from '@angular/core';
import { PackService } from 'src/app/ws/pack.service';
import { error } from 'protractor';

@Component({
	selector: 'app-pack',
	templateUrl: './pack.component.html',
	styleUrls: ['./pack.component.scss']
})
export class PackComponent implements OnInit {

	public packList = [];

	constructor(private packService: PackService) { }

	ngOnInit(): void {
		this.packService.getAllDefaultPacks().subscribe((data: Object[]) => {
			this.packList = data;
		}, error => {
			console.log(error);
		});
	}

}
