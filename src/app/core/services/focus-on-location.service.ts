import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Coordinates } from '../shared/models/coordinates.model';

@Injectable({
  providedIn: 'root'
})
export class FocusOnLocationService {
  private locationToFocusOn = new BehaviorSubject<Coordinates>({ lat: 0, lng: 0 });
  public locationToFocusOnListener = this.locationToFocusOn.asObservable();

  constructor() { }

  focusOnLocation(coordinates: Coordinates) {
    this.locationToFocusOn.next(coordinates);
  }

}
