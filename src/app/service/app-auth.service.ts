import { Injectable } from '@angular/core';
import { AppUser } from '../model/app-user';
import { UserSession } from '../model/user-session';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppAuthService {
  private _validSessionAvailable: boolean = false;
  private _loggedUser: AppUser;
  private _userSession: UserSession;

  // behaviour subject to inform the session status changes
  private notifier = new BehaviorSubject(this._validSessionAvailable);
  // status change tracker
  sessionStatus = this.notifier.asObservable();

  constructor() { }

  public get validSessionAvailable() {
    return this._validSessionAvailable;
  }

  public set validSessionAvailable(validity: boolean) {
    this._validSessionAvailable = validity;

    // inform subscribers about the session status changes.
    this.notifier.next(validity);
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
    this.loggedUser = user;
    this.userSession = session;
    this.validSessionAvailable = validSession;
  }

  reset() {
    this.loggedUser = undefined;
    this.userSession = undefined;
    this.validSessionAvailable = false;
  }

}
