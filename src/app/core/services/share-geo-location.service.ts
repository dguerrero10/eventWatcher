import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareGeoLocationService {
  private geoLocation = new BehaviorSubject<boolean>(false);
  public geoLocationListener = this.geoLocation.asObservable();

  constructor() { }

  shareGeoLocation(value: boolean) {
    this.geoLocation.next(value);
  }

}
