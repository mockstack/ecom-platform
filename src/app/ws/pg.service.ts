import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class PgService {

	private pgUrl: string = environment.apiUrl + "pg/"

	constructor(private httpClient: HttpClient) { }

	/**
	 * Check the payment status of a transaction.
	 * @param reqId id which is generated by the PG.
	 * @param clientRef transaction reference number which is generated by the backend.
	 */
	public getPaymentStatus(reqId: string, clientRef: string): Observable<object> {
		return this.httpClient.get(this.pgUrl + 'status/' + reqId + '/' + clientRef);
	}
}
