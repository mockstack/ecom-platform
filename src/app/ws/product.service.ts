import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  //private products: string = 'products/';
  private product: string = 'product/';

  constructor(private httpClient: HttpClient) { }

  /**
   * Get product names.
   */
  public getProductNames(): any {
    return this.httpClient.get(environment.apiUrl + this.product + '/names');
  }

  /**
   * Get products by category id.
   */
  public getProductsByCategoryId(id): Observable<Object> {
    return this.httpClient.get(environment.apiUrl + this.product + 'byCategory/' + id);
  }

  /**Get product by product id */
  public getProduct(id): Observable<Object> {
    return this.httpClient.get(environment.apiUrl + this.product + id);
  }
}
