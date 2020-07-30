import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { District } from 'src/app/model/district';
import { DeliveryAreaService } from 'src/app/ws/delivery-area.service';
import { DeliveryArea } from 'src/app/model/delivery-area';
import { UserProfileService } from 'src/app/ws/user-profile.service';
import { AppAuthService } from 'src/app/service/app-auth.service';
import { AppUserProfile } from 'src/app/model/app-user-profile';
import { City } from 'src/app/model/city';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-profile-basic',
	templateUrl: './profile-basic.component.html',
	styleUrls: ['./profile-basic.component.scss']
})
export class ProfileBasicComponent implements OnInit {

	public profileForm: FormGroup;
	public submitted = false;
	public districtList: District[];
	public deliveryCityList: DeliveryArea[];
	public selectedDistrict: District;
	private selectedCity: City;
	public userProfile: AppUserProfile;

	constructor(private formBuilder: FormBuilder, private deliveryAreaService: DeliveryAreaService,
		private profileService: UserProfileService, private authService: AppAuthService, private toastr: ToastrService) {
		this.districtList = [];
		this.deliveryCityList = [];
	}

	ngOnInit(): void {
		this.profileForm = this.formBuilder.group({
			firstName: ['', [Validators.required]],
			lastName: ['', Validators.required],
			email: ['', Validators.required],
			district: ['', Validators.required],
			city: ['', Validators.required],
			address: ['', Validators.required],
			optionalAddress: ['', !Validators.required],
			contact_number: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]]
		});

		this.authService.sessionStatus.subscribe((validity: Boolean) => {
			if (validity) {
				this.profileService.getProfileByUserId(this.authService.loggedUser._id).subscribe((data: AppUserProfile) => {
					if (data === null) {
						return;
					}
					this.userProfile = data;
					this.profileForm.patchValue({
						firstName: this.userProfile.first_name,
						lastName: this.userProfile.last_name,
						email: this.userProfile.email,
						address: this.userProfile.address,
						optionalAddress: this.userProfile.optional_address,
						district: this.userProfile.district._id,
						city: this.userProfile.city._id,
						contact_number: this.userProfile.contact_number
					});
					this.selectedDistrict = this.userProfile.district;
					this.selectedCity = this.userProfile.city;

					// get city list for the profile
					this.deliveryAreaService.getDeliveryCityByDistrictId(this.selectedDistrict._id).subscribe((data: DeliveryArea[]) => {
						this.deliveryCityList = data;
					});
				}, error => {
					console.log(error);
				});
			}

		});

		// get district list for the profile
		this.deliveryAreaService.getDeliveryDistrictList().subscribe((data: District[]) => {
			this.districtList = data;
		});



	}

	onDistrictChange(districtId: any) {
		this.deliveryCityList = [];
		this.selectedDistrict = this.districtList.filter(item => item._id === districtId)[0];
		this.deliveryAreaService.getDeliveryCityByDistrictId(this.selectedDistrict._id).subscribe((data: DeliveryArea[]) => {
			this.deliveryCityList = data;
		}, error => {
			console.log(error)
		});
	}

	onCityChange(cityId: any) {
		this.selectedCity = this.deliveryCityList.filter(item => item._id === cityId)[0].city;
	}

	get formField() {
		return this.profileForm.controls;
	}

	submitForm(value: any) {
		this.submitted = true;

		if (this.profileForm.invalid) {
			return;
		}

		value.user = this.userProfile.user._id;

		this.profileService.updateUsreProfile(value).subscribe(data => {
			this.toastr.success("Profile was updated successfully", "Success")
		}, error => {
			this.toastr.error("Profile update fail", "Fail")
		})
	}

}
