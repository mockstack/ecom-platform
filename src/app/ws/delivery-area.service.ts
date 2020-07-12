import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { City } from '../model/city';

@Injectable({
	providedIn: 'root'
})
export class DeliveryAreaService {

	private CITY: string = environment.apiUrl + "city/"
	private DISTRICT: string = environment.apiUrl + "district/"
	private PROVINCE: string = environment.apiUrl + "province/"
	private DEL_AREA: string = environment.apiUrl + "delivery/"

	constructor(private httpClient: HttpClient) { }

	public getDeliveryCities(): Observable<object> {
		return this.httpClient.get(this.DEL_AREA);
	}

	public getDeliveryDistrictList(): Observable<object> {
		return this.httpClient.get(this.DEL_AREA + 'district')
	}

	public getDeliveryCityByDistrictId(districtId: String): Observable<object> {
		return this.httpClient.get(this.DEL_AREA + districtId)
	}

	public getDeliveryAreas(): Observable<object> {
		return this.httpClient.get(this.DEL_AREA)
	}
}
