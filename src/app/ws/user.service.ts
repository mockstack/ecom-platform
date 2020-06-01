import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  /**
   * Add a new user.
   * @param data user register data as a string
   */
  public registerUser(data: String): Observable<Object> {
    return this.httpClient.post(environment.apiUrl + 'user/add', data);
  }

  /**Add a social login */
  public addSocialLogin(data: any): Observable<Object> {
    return this.httpClient.post(environment.apiUrl + 'social', data);
  }
}
