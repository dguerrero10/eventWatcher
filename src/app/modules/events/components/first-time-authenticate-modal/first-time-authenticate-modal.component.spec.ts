import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstTimeAuthenticateModalComponent } from './first-time-authenticate-modal.component';

describe('FirstTimeAuthenticateModalComponent', () => {
  let component: FirstTimeAuthenticateModalComponent;
  let fixture: ComponentFixture<FirstTimeAuthenticateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstTimeAuthenticateModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstTimeAuthenticateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
