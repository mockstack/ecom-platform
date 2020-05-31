import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackContentComponent } from './pack-content.component';

describe('PackContentComponent', () => {
  let component: PackContentComponent;
  let fixture: ComponentFixture<PackContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
