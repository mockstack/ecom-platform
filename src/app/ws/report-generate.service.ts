import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class ReportGenerateService {
	private URL = environment.apiUrl + 'report/';

	constructor(private httpClient: HttpClient) { }

	/**
	 * Generate the customer invoice
	 * @param ref transaction reference number
	 */
	public generateInvoice(ref: String): Observable<Object> {
		return this.httpClient.get(this.URL + 'customer-invoice/' + ref);
	}
}
