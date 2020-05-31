import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackGridComponent } from './pack-grid.component';

describe('PackGridComponent', () => {
  let component: PackGridComponent;
  let fixture: ComponentFixture<PackGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
