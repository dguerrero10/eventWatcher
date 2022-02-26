import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleMapsWrapperComponent } from './google-maps-wrapper.component';

describe('GoogleMapsWrapperComponent', () => {
  let component: GoogleMapsWrapperComponent;
  let fixture: ComponentFixture<GoogleMapsWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoogleMapsWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleMapsWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
