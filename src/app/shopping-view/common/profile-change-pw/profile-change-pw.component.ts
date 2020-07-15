import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/utils/register/register.component';
import { AppAuthService } from 'src/app/service/app-auth.service';
import { AppUserProfile } from 'src/app/model/app-user-profile';
import { UserProfileService } from 'src/app/ws/user-profile.service';
import { UserService } from 'src/app/ws/user.service';
import { ToastrService } from 'ngx-toastr';
import { CryptoService } from 'src/app/service/crypto.service';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-profile-change-pw',
	templateUrl: './profile-change-pw.component.html',
	styleUrls: ['./profile-change-pw.component.scss']
})
export class ProfileChangePwComponent implements OnInit {

	public paswordChangeForm: FormGroup;
	public submitted = false;
	public userProfile: AppUserProfile;
	public isAppUser = false;

	constructor(private formBuilder: FormBuilder, private authService: AppAuthService,
		private profileService: UserProfileService, private userService: UserService,
		private toastr: ToastrService, private cryptoService: CryptoService) { }

	ngOnInit(): void {
		this.paswordChangeForm = this.formBuilder.group({
			oldPassword: ['', [Validators.required]],
			newPassword: ['', [Validators.required, Validators.minLength(6)]],
			confirmPassword: ['', Validators.required]
		}, {
			validator: MustMatch('newPassword', 'confirmPassword')
		});

		this.authService.sessionStatus.subscribe((validity: Boolean) => {
			if (validity) {
				this.profileService.getProfileByUserId(this.authService.loggedUser._id).subscribe((data: AppUserProfile) => {
					if (data === null) return;

					this.userProfile = data;
					if (this.userProfile.user.provider === "APP") {
						this.isAppUser = true;
					}

				}, error => {
					console.log(error);
				});
			}

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

		value.newPassword = this.cryptoService.set(environment.key, value.newPassword)
		value.oldPassword = this.cryptoService.set(environment.key, value.oldPassword)
		value.confirmPassword = this.cryptoService.set(environment.key, value.confirmPassword)

		this.userService.updatePassword(value).subscribe(data => {
			this.toastr.success("Password change success", "Success")
		}, error => {
			this.toastr.error("Password change failed", "Fail")
		})

	}

}