import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) { }

  /**
   * Get category names.
   */
  public getProductCategories(): Observable<Object> {
    return this.httpClient.get(environment.apiUrl + 'category');
  }
  
}
