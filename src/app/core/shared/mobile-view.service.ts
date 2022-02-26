import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MobileViewService {
  private onMobileView = new BehaviorSubject<boolean>(false);
  public onMobileViewListener = this.onMobileView.asObservable();

  constructor() { }

  switchToMobileState(value: boolean) {
    this.onMobileView.next(value);
  }

}
