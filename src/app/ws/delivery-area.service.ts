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

	/**Get all provinces */
	public getProvinces(): Observable<object> {
		return this.httpClient.get(this.PROVINCE);
	}

	/**Get districts for a province */
	public getDistrictsByProvinceId(provinceId): Observable<object> {
		return this.httpClient.get(this.DISTRICT + provinceId);
	}

	/**Get districts for a province */
	public getDistrictsByDistrictId(districtId): Observable<object> {
		return this.httpClient.get(this.DISTRICT + districtId);
	}

	/**Get cities for a district */
	public getCitiesByDistrictId(districtId): Observable<object> {
		return this.httpClient.get(this.CITY + districtId);
	}

	/**Update province */
	public updateProvince(provinceId, deliveryAvailable: Boolean): Observable<object> {
		const status = { available: deliveryAvailable };
		return this.httpClient.put(this.PROVINCE + provinceId, status);
	}

	/**Update district */
	public updateDistrict(districtId, provId: any): Observable<object> {
		const status = { available: provId };
		return this.httpClient.put(this.DISTRICT + districtId, status);
	}

	/**Update city */
	public updateCity(cityId, deliveryAvailable: Boolean): Observable<object> {
		const status = { available: deliveryAvailable };
		return this.httpClient.put(this.CITY + cityId, status);
	}

	/**Get delivery cities */
	public getDeliveryCities(): Observable<object> {
		return this.httpClient.get(this.DEL_AREA);
	}

	/**Add delivery city list */
	public addDeliveryCities(idList: String[]): Observable<object> {
		return this.httpClient.post(this.DEL_AREA, { "cities": idList });
	}

	/**Update delivery city list */
	public updateDeliveryCities(idList: String[], listId: String): Observable<object> {
		return this.httpClient.put(this.DEL_AREA + listId, { "cities": idList });
	}
}
