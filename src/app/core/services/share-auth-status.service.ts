import { Injectable } from '@angular/core';;
import { BehaviorSubject } from 'rxjs';
import { Auth } from '../shared/models/auth';

@Injectable({
  providedIn: 'root'
})
export class ShareAuthStatusService {
  private authenticated = new BehaviorSubject<Auth>({ isLoggedIn: false, uid: '' });
  public authenticatedListener = this.authenticated.asObservable();

  constructor() { 
  }

  isLoggedIn(value: Auth) {
    this.authenticated.next(value);
  }

}
