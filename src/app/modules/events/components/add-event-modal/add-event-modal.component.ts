import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, switchMap, take, takeUntil } from 'rxjs';
import { Event } from 'src/app/core/shared/models/event.model';
import { ShareGeoLocationService } from 'src/app/core/services/share-geo-location.service';
import { ShareAuthStatusService } from 'src/app/core/services/share-auth-status.service';
import { GetIPAddressService } from 'src/app/core/services/get-ip-address.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Auth } from 'src/app/core/shared/models/auth.model';
import { ChangeLanguageService } from 'src/app/core/services/change-language.service';
import { LANGUAGE_DICT } from 'src/app/core/data/language-dict';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-event-modal',
  templateUrl: './add-event-modal.component.html',
  styleUrls: ['./add-event-modal.component.scss']
})
export class AddEventModalComponent implements OnInit, OnDestroy {
  public eventForm: FormGroup = <FormGroup>{};
  public invalidClassification: boolean = false;
  public lang: any;
  public isSubmitting: boolean = false;
  private eventsCollection: AngularFirestoreCollection<Event> | any;
  private coordinates = { lat: 0, lng: 0 };
  private uid: string | null = '';
  private IPAddress: string | null = '';
  private readonly $destroy = new Subject();

  constructor(private shareAuthStatusService: ShareAuthStatusService,
              private dialogRef: MatDialogRef<AddEventModalComponent>,
              private changeLanguageService: ChangeLanguageService,
              private shareGeoLocationService: ShareGeoLocationService,
              private getIPAddressService: GetIPAddressService,
              private snackbar: MatSnackBar,
              private fb: FormBuilder,
              private afs: AngularFirestore) { }

  ngOnInit(): void {
    this.createForm();
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

    this.getIPAddressService.IPAddressListener
        .pipe(
          takeUntil(this.$destroy))
         .subscribe((ip: any) => this.IPAddress = ip);

    this.eventsCollection = this.afs.collection<Event>('events');
    this.shareGeoLocationService.geoLocationListener
      .pipe(
        takeUntil(this.$destroy))
       .subscribe((coordinates: any) => {
          this.coordinates.lat = coordinates.lat;
          this.coordinates.lng = coordinates.lng;
       });   
  }

  getFormErrors(el: string) {
    switch (el) {
      case 'classification':
        if (this.eventForm.controls['classification'].hasError('required')) {
          return this.lang.formErrors.classifyEventRequired;
        }
        if (this.eventForm.controls['classification'].hasError('maxlength')) {
          return this.lang.formErrors.cannotExceed40Characters;
        }
        else return;
      case 'eventDescription':
        if (this.eventForm.controls['eventDescription'].hasError('required')) {
          return this.lang.formErrors.eventDescriptionRequired;
        }
        if (this.eventForm.controls['eventDescription'].hasError('maxlength')) {
          return this.lang.formErrors.cannotExceed300Characters;
        }
        else return;
      default:
        return;
    }
  }

  createForm() {
    this.eventForm = this.fb.group({
      'uid': [null],
      'IPAddress': [null],
      'classification': [null, [Validators.required, Validators.maxLength(40)]],
      'eventDescription': [null, [Validators.required, Validators.maxLength(300)]],
       'coordinates': [null],
      'timestamp': [null]
    });
  }

  onSubmit(formData: FormGroup) {
    if (this.eventForm.invalid) return;

    let splitAnsw = this.eventForm.controls['classification'].value.split(' ');

    if (splitAnsw.length > 2) {
      this.invalidClassification = true;
        setTimeout(() => {
          this.invalidClassification = false;
        }, 3000);
        this.eventForm.controls['classification'].setErrors({ 'incorrect': true });
        return;
    }

    this.isSubmitting = true;
    
    if (typeof(this.coordinates.lat) === 'undefined' || 
        typeof(this.coordinates.lng) === 'undefined' ) {
          this.isSubmitting = false;
          return this.snackbar.open(this.lang.location.locationServiceOn, this.lang.eventDetail.close, {
            duration: 3000
          });
        }

    this.eventForm.patchValue({ 'uid': this.uid });
    this.eventForm.patchValue({ 'IPAddress': this.IPAddress });
    this.eventForm.patchValue({ 'coordinates': this.coordinates });
    this.eventForm.patchValue({ 'timestamp': new Date().toLocaleString() });

    this.eventsCollection?.
    add(formData.value)
    .then(() => {
        this.isSubmitting = true;
        this.dialogRef.close();
        this.dialogRef.afterClosed()
        this.snackbar.open(this.lang.snackbar.successfullyAdded, this.lang.eventDetail.close);
      }).catch(() => {
        this.isSubmitting = false;
        this.snackbar.open(this.lang.serverError.error, this.lang.shared.close, {
          duration: 2000
        });
      });
      return;
  }

  ngOnDestroy(): void {
      this.$destroy.next(void 0);
      this.$destroy.complete();
  }

}