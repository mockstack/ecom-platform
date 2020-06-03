import { Injectable } from '@angular/core';
import { AppUser } from '../model/app-user';
import { UserSession } from '../model/user-session';

@Injectable({
  providedIn: 'root'
})
export class AppAuthService {

  private _validtSessionAvailable: boolean = false;
  private _loggedUser: AppUser;
  private _userSession: UserSession;

  constructor() { }
  
  public get validSessionAvailable() {
    return this._validtSessionAvailable;
  }
  
  public set validSessionAvailable(validity : boolean) {
    this._validtSessionAvailable = validity;
  }
  
  public get loggedUser() {
    return this._loggedUser;
  }

  public set loggedUser(user: AppUser) {
    this._loggedUser = user;
  }

  public get userSession() {
    return this._userSession;
  }

  public set userSession(session: UserSession) {
    this._userSession = session;
  }

  initiateSession(user: AppUser, session: UserSession, validSession: boolean) {
    this._loggedUser = user;
    this._userSession = session;
    this._validtSessionAvailable = validSession;
  }

  reset() {
    this._loggedUser = undefined;
    this._userSession = undefined;
    this._validtSessionAvailable = false;
  }
}
