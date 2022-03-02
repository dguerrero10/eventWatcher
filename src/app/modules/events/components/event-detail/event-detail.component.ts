import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, Subject, takeUntil } from 'rxjs';
import { map } from 'rxjs/operators';
import { FocusOnLocationService } from 'src/app/core/services/focus-on-location.service';
import { ShareEventLocationService } from 'src/app/core/services/share-event-location.service';
import { Event } from '../../../../core/shared/models/event.model';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit, OnDestroy {
  public events: Event[] | any;
  private readonly $destroy = new Subject();

  constructor(private shareEventLocationService: ShareEventLocationService,
              private focusOnLocationService: FocusOnLocationService) { }

  ngOnInit(): void {
    this.shareEventLocationService.eventLocationsListener
      .pipe(
        takeUntil(this.$destroy)
      )
       .subscribe((events: Event[]) => this.events = events);
  }

  focusOnLocation(event: Event) {
    const { lat, lng } = event.coordinates; 
    this.focusOnLocationService.focusOnLocation({ lat, lng });
  }

  ngOnDestroy(): void {
      this.$destroy.next(void 0);
      this.$destroy.complete();
  }
}
