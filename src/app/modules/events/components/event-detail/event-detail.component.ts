import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { LANGUAGE_DICT } from 'src/app/core/data/language-dict';
import { ChangeLanguageService } from 'src/app/core/services/change-language.service';
import { FocusOnLocationService } from 'src/app/core/services/focus-on-location.service';
import { ShareAuthStatusService } from 'src/app/core/services/share-auth-status.service';
import { ShareEventLocationService } from 'src/app/core/services/share-event-location.service';
import { Auth } from 'src/app/core/shared/models/auth.model';
import { Event } from '../../../../core/shared/models/event.model';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit, OnDestroy {
  public events: Event[] | any;
  public lang: any;
  public uid: string | null = '';
  public isDeleting: boolean = false;
  private readonly $destroy = new Subject();

  constructor(private changeLanguageService: ChangeLanguageService,
              private shareAuthStatusService: ShareAuthStatusService,
              private afs: AngularFirestore,
              private snackbar: MatSnackBar,
              private shareEventLocationService: ShareEventLocationService,
              private focusOnLocationService: FocusOnLocationService) { }

  ngOnInit(): void {
    this.shareAuthStatusService.authenticatedListener
    .pipe(
      switchMap((value: Auth) => {
        this.uid = value.uid;
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
    this.shareEventLocationService.eventLocationsListener
      .pipe(
        takeUntil(this.$destroy)
      )
       .subscribe((events: Event[]) => this.events = events);
  }

  deleteEvent(id: string) {
    this.isDeleting = true;
    this.afs.doc(`events/${id}`).delete()
    .then(() => {
      this.isDeleting = false;
      this.snackbar.open(this.lang.snackbar.deletedSucessfully, this.lang.eventDetail.close, {
        duration: 2000
      });
    }).catch(() => {
      this.isDeleting = false;
      this.snackbar.open(this.lang.serverError.error, this.lang.shared.close, {
        duration: 2000
      });
    });
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
