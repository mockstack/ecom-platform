import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart } from '../model/cart';
import { environment } from 'src/environments/environment';
import { CartSave } from '../service/cart-data.service';

@Injectable({
	providedIn: 'root'
})
export class CartService {

	constructor(private httpClient: HttpClient) { }

	/**Initialize the cart with basic data */
	public addCart(data: CartSave): Observable<Object> {
		return this.httpClient.post(environment.apiUrl + 'cart', data);
	}

	/**Update the cart */
	public updateCart(data: CartSave): Observable<Object> {
		return this.httpClient.put(environment.apiUrl + 'cart/' + data._id, data);
	}

	public checkOut(data: any) {
		return this.httpClient.post(environment.apiUrl + 'order', data);
	}
}
