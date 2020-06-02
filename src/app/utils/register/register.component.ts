import { Component, OnInit } from '@angular/core';
import { CryptoService } from 'src/app/service/crypto.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/ws/user.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
	email: String;
	password: String;
	registerForm: FormGroup;
	submitted = false;

	constructor(private cryptoService: CryptoService, private formBuilder: FormBuilder,
		private userService: UserService, private toastr: ToastrService) { }

	ngOnInit(): void {
		this.registerForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(1)]],
			confirmPassword: ['', Validators.required]
		}, {
			validator: MustMatch('password', 'confirmPassword')
		});
	}

	get formField() {
		return this.registerForm.controls;
	}

	submitForm() {
		this.submitted = true;

		if (this.registerForm.invalid) {
			return;
		}

		this.registerForm.value.password = this.cryptoService.set(environment.key, this.registerForm.value.password);
		let payload = JSON.stringify(this.registerForm.value, null, 4);
		this.userService.addUser(JSON.parse(payload)).subscribe((data) => {
			this.toastr.success('User added successfully', 'Success');
		}, (error) => {
			console.log(error);
			this.toastr.error(error.message, 'Error');
		});

	}

	onReset() {
		this.submitted = false;
		this.registerForm.reset();
	}
}

export function MustMatch(controlName: string, matchingControlName: string) {
	return (formGroup: FormGroup) => {
		const control = formGroup.controls[controlName];
		const matchingControl = formGroup.controls[matchingControlName];

		if (matchingControl.errors && !matchingControl.errors.mustMatch) {
			// return if another validator has already found an error on the matchingControl
			return;
		}

		// set error on matchingControl if validation fails
		if (control.value !== matchingControl.value) {
			matchingControl.setErrors({ mustMatch: true });
		} else {
			matchingControl.setErrors(null);
		}
	}
}