import { Component, OnInit, SimpleChanges } from '@angular/core';
import { PackService } from 'src/app/ws/pack.service';
import { AppUser } from 'src/app/model/app-user';
import { AppAuthService } from 'src/app/service/app-auth.service';
import { Router } from '@angular/router';
import Key from 'src/app/utils/key';

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

	constructor(private packService: PackService, public appAuthService: AppAuthService, private router: Router) {
	}

	ngOnInit(): void {
		// get default packs
		this.packService.getAllDefaultPacks().subscribe((data: Object[]) => {
			this.defaultPackList = data;
			// save items in the session storage
			sessionStorage.setItem(Key.SS_PACK_DEFAULT, JSON.stringify(this.defaultPackList));
		}, error => {
			console.log(error);
		});

		// get private packs
		if (this.appAuthService.validSessionAvailable) {
			this.loggedUser = this.appAuthService.loggedUser;
			console.log(this.loggedUser);

			this.packService.getPrivatePacksByUserId(this.loggedUser._id).subscribe((data: Object[]) => {
				this.myPackList = data;
				//save my packs in the session storage
				sessionStorage.setItem(Key.SS_PACK_PRIVATE, JSON.stringify(this.myPackList));
				if (this.myPackList.length > 0) {
					this.userPackAvailable = true;
				}
			}, error => {
				console.log(error);
			})
		}
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes[''].currentValue) {

		}

	}

	showCreatePack() {
		this.router.navigateByUrl('pack/create');
	}

}
