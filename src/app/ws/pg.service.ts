import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class PgService {

	constructor(private httpClient: HttpClient) { }

	/**
	 * Save payment object
	 * @param data payment object
	 */
	public savePaymentObject(data: any): Observable<Object> {
		return this.httpClient.post(environment.apiUrl + 'pg/savepo', data);
	}
}
