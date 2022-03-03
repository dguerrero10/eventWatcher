import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { EventListOpenService } from 'src/app/core/services/event-list-open.service';
import { MobileViewService } from 'src/app/core/services/mobile-view.service';
import { ShareAuthStatusService } from 'src/app/core/services/share-auth-status.service';
import { ShareEventLocationService } from 'src/app/core/services/share-event-location.service';
import { Auth } from 'src/app/core/shared/models/auth';
import { AddEventModalComponent } from '../../components/add-event-modal/add-event-modal.component';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit, OnDestroy {
  private eventsCollection: AngularFirestoreCollection<Event> | any;
  public events: Observable<Event[]> | any;
  public onMobile: boolean = false;
  public isLoggedIn: boolean = false;
  public eventListOpen: boolean = false;
  public shownMessage: boolean = false;
  private readonly $destroy = new Subject();

  constructor(private shareAuthStatusService: ShareAuthStatusService,
              private shareEventLocationService: ShareEventLocationService,
              private snackbar: MatSnackBar,
              private afs: AngularFirestore,
              private eventListOpenService: EventListOpenService,
              private breakpointObserver: BreakpointObserver,
              private mobileViewService: MobileViewService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.shareAuthStatusService.authenticatedListener
      .pipe(
        takeUntil(this.$destroy)
      )
       .subscribe((value: Auth) => {
         this.isLoggedIn = value.isLoggedIn;
         if (!this.isLoggedIn && !this.shownMessage) {
            this.snackbar.open('Authenticate yourself to add an event.', 'Dismiss', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            });
            this.shownMessage = true;
          }
        });
    this.eventsCollection = this.afs.collection<Event>('events', ref => ref.orderBy('timestamp', 'desc'));
    this.events = this.eventsCollection.snapshotChanges()
    .pipe(
        map((events: Event[]) => {
          return events.map((e: any) => {
            const data = e.payload.doc.data() as Event;
            const id = e.payload.doc.id;
            return { id, ...data }
          });
      }));

    this.events.pipe(
      takeUntil(this.$destroy)
     )
     .subscribe((events: Event[]) => {
       this.shareEventLocationService.shareEventLocations(events);
    });

    this.eventListOpenService.eventListOpenListener
    .pipe(
      takeUntil(this.$destroy)
      )
      .subscribe(isOpen => {
          if (isOpen) {
            this.eventListOpen = true;
          } else {
            this.eventListOpen = false;
          }
      });

    this.breakpointObserver
    .observe(['(max-width: 500px)'])
    .pipe(
      takeUntil(this.$destroy)
    )
    .subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.onMobile = true;
        this.mobileViewService.switchToMobileState(true);
      } else {
        this.onMobile = false;
        this.mobileViewService.switchToMobileState(false);
      }
    });
  
  }

  addEvent() {
    this.dialog.open(AddEventModalComponent, {
      minWidth: '300px',
      panelClass: 'modal-class'
    });
  }

  ngOnDestroy(): void {
      this.$destroy.next(void 0);
      this.$destroy.complete();
  }

}
