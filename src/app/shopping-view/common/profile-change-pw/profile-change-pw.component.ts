import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/utils/register/register.component';

@Component({
	selector: 'app-profile-change-pw',
	templateUrl: './profile-change-pw.component.html',
	styleUrls: ['./profile-change-pw.component.scss']
})
export class ProfileChangePwComponent implements OnInit {

	public paswordChangeForm: FormGroup;
	public submitted = false;

	constructor(private formBuilder: FormBuilder) { }

	ngOnInit(): void {
		this.paswordChangeForm = this.formBuilder.group({
			oldPassword: ['', [Validators.required]],
			newPassword: ['', [Validators.required, Validators.minLength(6)]],
			confirmPassword: ['', Validators.required]
		}, {
			validator: MustMatch('newPassword', 'confirmPassword')
		});
	}

	get formField() {
		return this.paswordChangeForm.controls;
	}

	submitForm(value: any) {
		this.submitted = true;

		if (this.paswordChangeForm.invalid) {
			return;
		}

		//{ oldPassword: "123", newPassword: "123456", confirmPassword: "123456" }
		console.log(value)
	}

}