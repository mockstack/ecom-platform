import { Component, OnInit } from '@angular/core';
import { PackService } from 'src/app/ws/pack.service';
import { error } from 'protractor';
import { AppUser } from 'src/app/model/app-user';
import { CookieService } from 'ngx-cookie-service';
import { AppAuthService } from 'src/app/service/app-auth.service';

@Component({
	selector: 'app-pack',
	templateUrl: './pack.component.html',
	styleUrls: ['./pack.component.scss']
})
export class PackComponent implements OnInit {

	public defaultPackList = [];
	public myPackList = [];
	public loggedUser: AppUser;
	public userPackAvailable: boolean = false;

	constructor(private packService: PackService, private cookieService: CookieService, private appAuthService: AppAuthService) { }

	ngOnInit(): void {
		// get default packs
		this.packService.getAllDefaultPacks().subscribe((data: Object[]) => {
			this.defaultPackList = data;
		}, error => {
			console.log(error);
		});

		// get private packs
		if (this.cookieService.get('loggedUser') !== '') {
			this.loggedUser = new AppUser().deserialize(JSON.parse(this.cookieService.get('loggedUser')));

			this.packService.getPrivatePacksByUserId(this.loggedUser._id).subscribe((data: Object[]) => {
				this.myPackList = data;
				if (this.myPackList.length > 0) {
					this.userPackAvailable = true;
				}
			}, error => {
				console.log(error);
			})
		}
	}

}
