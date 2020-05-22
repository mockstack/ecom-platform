import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  /**
   * Get product names.
   */
  public getProductNames(): any {
    return this.httpClient.get(environment.apiUrl + 'product/names');
  }

  /**
   * Get products by category id.
   */
  public getProductsByCategoryId(id): Observable<Object> {
    return this.httpClient.get(environment.apiUrl + 'product/byCategory/' + id);
  }
}
