import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticateModalComponent } from './authenticate-modal.component';

describe('AuthenticateModalComponent', () => {
  let component: AuthenticateModalComponent;
  let fixture: ComponentFixture<AuthenticateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthenticateModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
