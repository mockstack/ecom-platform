import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/utils/register/register.component';
import { AppAuthService } from 'src/app/service/app-auth.service';
import { AppUserProfile } from 'src/app/model/app-user-profile';
import { UserProfileService } from 'src/app/ws/user-profile.service';

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

	constructor(private formBuilder: FormBuilder, private authService: AppAuthService, private profileService: UserProfileService) { }

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

		//{ oldPassword: "123", newPassword: "123456", confirmPassword: "123456" }
		console.log(value)
	}

}