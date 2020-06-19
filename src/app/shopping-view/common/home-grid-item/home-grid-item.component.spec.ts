import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeGridItemComponent } from './home-grid-item.component';

describe('HomeGridItemComponent', () => {
  let component: HomeGridItemComponent;
  let fixture: ComponentFixture<HomeGridItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeGridItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeGridItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
