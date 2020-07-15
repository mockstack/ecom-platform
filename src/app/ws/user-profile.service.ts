import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class UserProfileService {

	private baseURL = environment.apiUrl + "profile";

	constructor(private httpClient: HttpClient) { }

	/**Get profile by user id */
	public getProfileByUserId(userId: String): Observable<object> {
		return this.httpClient.get(this.baseURL + "/" + userId);
	}

	/**Add new user profile */
	public addUsreProfile(data: any) {
		return this.httpClient.post(this.baseURL, data);
	}

	/**Update existing user profile */
	public updateUsreProfile(data: any) {
		return this.httpClient.put(this.baseURL, data);
	}
}
