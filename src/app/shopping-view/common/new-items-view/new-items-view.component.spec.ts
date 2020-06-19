import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewItemsViewComponent } from './new-items-view.component';

describe('NewItemsViewComponent', () => {
  let component: NewItemsViewComponent;
  let fixture: ComponentFixture<NewItemsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewItemsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewItemsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
