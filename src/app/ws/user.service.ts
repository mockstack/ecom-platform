import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  /*public registerUser(data: String): Observable<Object> {
    return this.httpClient.post(environment.apiUrl + 'user', data);
  }
  public addSocialLogin(data: any): Observable<Object> {
    return this.httpClient.post(environment.apiUrl + 'social', data);
  }*/

  /**Add new user */
  public addUser(data: any): Observable<object> {
    return this.httpClient.post(environment.apiUrl + 'user', data);
  }

  /**Login a user */
  public login(userName: string, password: string, provider: string): Observable<object> {
    let login = { email: userName, password: password, provider: provider };
    return this.httpClient.post(environment.apiUrl + 'user/login', login);
  }

  /**Update user */
  public updateUser(data: any): Observable<object> {
    return this.httpClient.put(environment.apiUrl + 'user', data);
  }

  /**Change password */
  public updatePassword(data: any): Observable<object> {
    return this.httpClient.put(environment.apiUrl + 'user' + '/changepw', data);
  }

  /**Get user by user id */
  public getUserByUserId(userId: string): Observable<object> {
    return this.httpClient.get(environment.apiUrl + 'user/' + userId);
  }

    /**Get user by user id */
    public getUserBySocialId(socialId: String): Observable<object> {
      return this.httpClient.get(environment.apiUrl + 'user/social/' + socialId);
    }

  /**Initialize a session */
  public initiateSession(userId: string): Observable<object> {
    let data = { userId: userId };
    return this.httpClient.post(environment.apiUrl + 'session', data);
  }

  /**Validate the user current session */
  public validateSession(userId: string): Observable<object> {
    return this.httpClient.get(environment.apiUrl + 'session/' + userId);
  }

}
