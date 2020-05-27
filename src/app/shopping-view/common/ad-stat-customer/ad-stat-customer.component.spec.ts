import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdStatCustomerComponent } from './ad-stat-customer.component';

describe('AdStatCustomerComponent', () => {
  let component: AdStatCustomerComponent;
  let fixture: ComponentFixture<AdStatCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdStatCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdStatCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
