import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayMarkerInfoModalComponent } from './display-marker-info-modal.component';

describe('DisplayMarkerInfoModalComponent', () => {
  let component: DisplayMarkerInfoModalComponent;
  let fixture: ComponentFixture<DisplayMarkerInfoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayMarkerInfoModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayMarkerInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
