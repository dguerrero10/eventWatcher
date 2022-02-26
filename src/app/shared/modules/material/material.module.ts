import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion'
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRippleModule } from '@angular/material/core'
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';

const MaterialComponents = [
  MatToolbarModule,
  MatMenuModule,
  MatButtonModule,
  MatListModule,
  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
  MatPaginatorModule,
  MatTabsModule,
  MatExpansionModule,
  MatCardModule,
  MatDialogModule,
  MatProgressBarModule,
  MatSnackBarModule,
  MatIconModule,
  MatTooltipModule,
  MatBadgeModule,
  MatTableModule,
  MatSlideToggleModule,
  MatStepperModule,
  MatProgressSpinnerModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatChipsModule,
  MatButtonToggleModule,
  MatCheckboxModule,
  MatAutocompleteModule,
  MatGridListModule,
  MatRippleModule,
  MatRadioModule,
  LayoutModule,
  MatSidenavModule,
  MatSliderModule
];

@NgModule({
  declarations: [],
  exports: [MaterialComponents],
  imports: [
    CommonModule,
    MaterialComponents
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MaterialModule { }