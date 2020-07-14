import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { District } from 'src/app/model/district';
import { DeliveryAreaService } from 'src/app/ws/delivery-area.service';
import { DeliveryArea } from 'src/app/model/delivery-area';

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

	constructor(private formBuilder: FormBuilder, private deliveryAreaService: DeliveryAreaService) {
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
			optionalAddress: ['', !Validators.required]
		});		
		
		this.deliveryAreaService.getDeliveryDistrictList().subscribe((data: District[]) => {
			this.districtList = data;
		})


	}

	onDistrictChange(district: any) {
		this.deliveryCityList = [];
		this.selectedDistrict = JSON.parse(district);
		this.deliveryAreaService.getDeliveryCityByDistrictId(this.selectedDistrict._id).subscribe((data: DeliveryArea[]) => {
			this.deliveryCityList = data;
		}, error => {
			console.log(error)
		});
	}
	
	onCityChange(city: any) {}

	get formField() {
		return this.profileForm.controls;
	}

	submitForm(value: any) {
		this.submitted = true;

		if (this.profileForm.invalid) {
			return;
		}

		console.log(value)
	}

}
