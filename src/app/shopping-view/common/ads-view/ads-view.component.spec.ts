import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsViewComponent } from './ads-view.component';

describe('AdsViewComponent', () => {
  let component: AdsViewComponent;
  let fixture: ComponentFixture<AdsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
