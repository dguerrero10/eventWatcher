import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventListOpenService {
  private eventListOpen = new BehaviorSubject<boolean>(false);
  public eventListOpenListener = this.eventListOpen.asObservable();

  constructor() { }

  isEventListOpen(value: boolean) {
    this.eventListOpen.next(value);
  }

}
