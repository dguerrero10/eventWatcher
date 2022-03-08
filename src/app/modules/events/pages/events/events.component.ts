import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { LANGUAGE_DICT } from 'src/app/core/data/language-dict';
import { ChangeLanguageService } from 'src/app/core/services/change-language.service';
import { EventListOpenService } from 'src/app/core/services/event-list-open.service';
import { MobileViewService } from 'src/app/core/services/mobile-view.service';
import { ShareAuthStatusService } from 'src/app/core/services/share-auth-status.service';
import { ShareEventLocationService } from 'src/app/core/services/share-event-location.service';
import { Auth } from 'src/app/core/shared/models/auth.model';
import { Language } from 'src/app/core/shared/models/languages.model';
import { AddEventModalComponent } from '../../components/add-event-modal/add-event-modal.component';
import { ChangeLanguageModalComponent } from '../../components/change-language-modal/change-language-modal.component';

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
  public lang: any;
  public eventListOpen: boolean = false;
  public shownMessage: boolean = false;
  public languages: Language[] = [
      { viewValue: 'English', value: 'eng', selected: false },
      { viewValue: 'Ukranian', value: 'ukr', selected: false },
      { viewValue: 'Russian', value: 'ru', selected: false },
    ];
  private readonly $destroy = new Subject();

  constructor(private shareAuthStatusService: ShareAuthStatusService,
              private shareEventLocationService: ShareEventLocationService,
              private eventListOpenService: EventListOpenService,
              private breakpointObserver: BreakpointObserver,
              private mobileViewService: MobileViewService,
              private changeLanguageService: ChangeLanguageService,
              private snackbar: MatSnackBar,
              private afs: AngularFirestore,
              private dialog: MatDialog) { }

  ngOnInit(): void {
     this.shareAuthStatusService.authenticatedListener
    .pipe(
      switchMap((value: Auth) => {
        this.isLoggedIn = value.isLoggedIn;
        return this.changeLanguageService.selectedLangListener
      }),
      takeUntil(this.$destroy)
      )
      .subscribe((key: string) => {
        if (key === 'ukr') this.lang = this.lang = LANGUAGE_DICT['ukr'];
        else if (key === 'ru') this.lang = this.lang = LANGUAGE_DICT['ru'];
        else if (key === 'eng') this.lang = this.lang = LANGUAGE_DICT['eng'];
        else this.lang = this.lang = LANGUAGE_DICT['eng'];
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
    .observe(['(max-width: 740px)'])
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

  onLanguageChange(event: any) {
    this.changeLanguageService.changeLanguage(event.value);
  }

  addEvent() {
    this.dialog.open(AddEventModalComponent, {
      minWidth: '300px',
      panelClass: 'modal-class'
    });
  }

  changeLanguage() {
    this.dialog.open(ChangeLanguageModalComponent, {
      minWidth: '300px',
      panelClass: 'modal-class'
    });
  }

  ngOnDestroy(): void {
      this.$destroy.next(void 0);
      this.$destroy.complete();
  }

}
