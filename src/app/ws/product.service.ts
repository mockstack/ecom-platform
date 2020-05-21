import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private SERVICE = "http://localhost:3000/product/"

  constructor(private httpClient: HttpClient) { }

  /**
   * Get product names.
   */
  public getProductNames(): any {
    return this.httpClient.get(this.SERVICE + "names");
  }
}
