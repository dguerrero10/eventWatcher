import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { EventsComponent } from './pages/events/events.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { GoogleMapsWrapperComponent } from './components/google-maps-wrapper/google-maps-wrapper.component';
import { EventListComponenet } from './components/event-list/event-list.component';
import { EventDetailComponent } from './components/event-detail/event-detail.component';
import { AddEventModalComponent } from './components/add-event-modal/add-event-modal.component';
import { AuthenticateModalComponent } from './components/authenticate-modal/authenticate-modal.component';
import { FirstTimeAuthenticateModalComponent } from './components/first-time-authenticate-modal/first-time-authenticate-modal.component';
import { MobileViewEventListComponent } from './components/mobile-view-event-list/mobile-view-event-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DisplayMarkerInfoModalComponent } from './components/display-marker-info-modal/display-marker-info-modal.component';
import { ChangeLanguageModalComponent } from './components/change-language-modal/change-language-modal.component';


@NgModule({
  declarations: [
    EventsComponent,
    NavbarComponent,
    GoogleMapsWrapperComponent,
    EventListComponenet,
    EventDetailComponent,
    AddEventModalComponent,
    AuthenticateModalComponent,
    FirstTimeAuthenticateModalComponent,
    MobileViewEventListComponent,
    DisplayMarkerInfoModalComponent,
    ChangeLanguageModalComponent,
  ],
  imports: [
    CommonModule,
    GoogleMapsModule,
    EventsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ]
})
export class EventsModule { }
