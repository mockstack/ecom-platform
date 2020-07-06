import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutStatusComponent } from './checkout-status.component';

describe('CheckoutStatusComponent', () => {
  let component: CheckoutStatusComponent;
  let fixture: ComponentFixture<CheckoutStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
