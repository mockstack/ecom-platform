import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class ErrorLogService {
	private URL = environment.apiUrl + 'errorlog';

	constructor(private httpClient: HttpClient) { }

	/**
	 * Save payment object
	 * @param data payment object
	 */
	public saveError(data: any): Observable<Object> {
		return this.httpClient.post(this.URL, data);
	}
}
