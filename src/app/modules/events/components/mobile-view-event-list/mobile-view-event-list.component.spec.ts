import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileViewEventListComponent } from './mobile-view-event-list.component';

describe('MobileViewEventListComponent', () => {
  let component: MobileViewEventListComponent;
  let fixture: ComponentFixture<MobileViewEventListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileViewEventListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileViewEventListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
