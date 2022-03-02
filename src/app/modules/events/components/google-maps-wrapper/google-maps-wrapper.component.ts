import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { map } from 'rxjs/operators';
import { EventListOpenService } from 'src/app/core/services/event-list-open.service';
import { FocusOnLocationService } from 'src/app/core/services/focus-on-location.service';
import { MobileViewService } from 'src/app/core/services/mobile-view.service';
import { ShareEventLocationService } from 'src/app/core/services/share-event-location.service';
import { ShareGeoLocationService } from 'src/app/core/services/share-geo-location.service';
import { Coordinates } from 'src/app/core/shared/models/coordinates';
import { Event } from 'src/app/core/shared/models/event.model';
import { Marker } from 'src/app/core/shared/models/marker.model';
import { DisplayMarkerInfoModalComponent } from '../display-marker-info-modal/display-marker-info-modal.component';

@Component({
  selector: 'app-google-maps-wrapper',
  templateUrl: './google-maps-wrapper.component.html',
  styleUrls: ['./google-maps-wrapper.component.scss']
})
export class GoogleMapsWrapperComponent implements OnInit, OnDestroy {
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap | any;
  
  public infoContent: string = '';
  public onMobile: boolean = false;
  public markers: Marker[] | any = [];
  private readonly $destroy = new Subject();

  public zoom = 16
  public center: google.maps.LatLngLiteral | any;
  public options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: false,
    maxZoom: 22,
    minZoom: 4,
  }

  constructor(public dialog: MatDialog,
              private eventListOpenService: EventListOpenService,
              private focusOnLocationService: FocusOnLocationService,
              private shareEventLocationService: ShareEventLocationService,
              private shareGeoLocationService: ShareGeoLocationService,
              private mobileViewService: MobileViewService) { }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
      this.shareGeoLocationService.shareGeoLocation(this.center);
    });

    this.mobileViewService.onMobileViewListener
    .pipe(
      takeUntil(this.$destroy)
    )
    .subscribe(mobileState => {
        if (mobileState) {
          this.onMobile = true;
        } else {
          this.onMobile = false;
        }
    });

    this.focusOnLocationService.locationToFocusOnListener
      .pipe(
        takeUntil(this.$destroy)
       )
        .subscribe((coordinates: Coordinates) => {
          if (this.onMobile) {
              this.eventListOpenService.isEventListOpen(false);
          }
          this.center = { lat: coordinates.lat, lng: coordinates.lng }
      });

    this.shareEventLocationService.eventLocationsListener
      .pipe(
          map((event: any) => {
            return event.map((e: Event) => ({
              position: { lat: e.coordinates.lat, lng: e.coordinates.lng },
              options: { animation: google.maps.Animation.DROP },
              title: e.classification,
              eventDescription: e.eventDescription,
              timestamp: e.timestamp
            }))
          }),
          takeUntil(this.$destroy)
         )
          .subscribe((markers: Marker[]) => this.markers.push(markers));
  }

  openInfo(marker: Marker) {
    this.dialog.open(DisplayMarkerInfoModalComponent, {
      minWidth: '300px',
      panelClass: 'modal-class-2',
      data: { marker: marker }
    });
  }

  ngOnDestroy(): void {
      this.$destroy.next(void 0);
      this.$destroy.complete();
  }
}
