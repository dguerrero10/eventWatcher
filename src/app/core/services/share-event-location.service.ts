import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Marker } from '../shared/models/marker.model';

@Injectable({
  providedIn: 'root'
})
export class ShareEventLocationService {
  private eventLocations = new BehaviorSubject<Marker[] | any>([]);
  public eventLocationsListener = this.eventLocations.asObservable();

  constructor() { }

  shareEventLocations(markers: any) {
    this.eventLocations.next(markers);
  }

}
