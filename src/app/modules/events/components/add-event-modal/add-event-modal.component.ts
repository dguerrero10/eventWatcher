import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Event } from 'src/app/core/shared/models/event.model';
import { ShareGeoLocationService } from 'src/app/core/services/share-geo-location.service';
import { ShareAuthStatusService } from 'src/app/core/services/share-auth-status.service';
import { Auth } from 'src/app/core/shared/models/auth';
import { GetIPAddressService } from 'src/app/core/services/get-ip-address.service';

@Component({
  selector: 'app-add-event-modal',
  templateUrl: './add-event-modal.component.html',
  styleUrls: ['./add-event-modal.component.scss']
})
export class AddEventModalComponent implements OnInit, OnDestroy {
  public eventForm: FormGroup = <FormGroup>{};
  public invalidClassification: boolean = false;
  private eventsCollection: AngularFirestoreCollection<Event> | any;
  private coordinates = { lat: 0, lng: 0 };
  private uid: string | null = '';
  private IPAddress: string | null = '';
  private readonly $destroy = new Subject();

  constructor(private shareAuthStatusService: ShareAuthStatusService,
              private shareGeoLocationService: ShareGeoLocationService,
              private getIPAddressService: GetIPAddressService,
              private fb: FormBuilder,
              private afs: AngularFirestore) { }

  ngOnInit(): void {
    this.createForm();
    this.shareAuthStatusService.authenticatedListener
      .pipe(
        takeUntil(this.$destroy)
      )
       .subscribe((value: Auth) => this.uid = value.uid);
    this.getIPAddressService.IPAddressListener
        .pipe(
          takeUntil(this.$destroy)
        )
         .subscribe((ip: any) => this.IPAddress = ip);
    this.eventsCollection = this.afs.collection<Event>('events');
    this.shareGeoLocationService.geoLocationListener
      .pipe(
        takeUntil(this.$destroy)
      )
       .subscribe((coordinates: any) => {
          this.coordinates.lat = coordinates.lat;
          this.coordinates.lng = coordinates.lng;
       });   
  }

  getFormErrors(el: string) {
    switch (el) {
      case 'classification':
        if (this.eventForm.controls['classification'].hasError('required')) {
          return 'Classify event is required.'
        }
        if (this.eventForm.controls['classification'].hasError('maxlength')) {
          return 'Cannot exceed 40 characters.'
        }
        else return;
      case 'eventDescription':
        if (this.eventForm.controls['eventDescription'].hasError('required')) {
          return 'Event description is required.'
        }
        if (this.eventForm.controls['eventDescription'].hasError('maxlength')) {
          return 'Cannot exceed 300 characters.'
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

    this.eventForm.patchValue({ 'uid': this.uid });
    this.eventForm.patchValue({ 'IPAddress': this.IPAddress });
    this.eventForm.patchValue({ 'coordinates': this.coordinates });
    this.eventForm.patchValue({ 'timestamp': new Date().toLocaleString() });
    this.eventsCollection?.add(formData.value);
  }

  ngOnDestroy(): void {
      this.$destroy.next(void 0);
      this.$destroy.complete();
  }

}