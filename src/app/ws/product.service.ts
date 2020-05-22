import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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
}
