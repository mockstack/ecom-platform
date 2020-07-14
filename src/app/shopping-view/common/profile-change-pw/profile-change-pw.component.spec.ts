import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileChangePwComponent } from './profile-change-pw.component';

describe('ProfileChangePwComponent', () => {
  let component: ProfileChangePwComponent;
  let fixture: ComponentFixture<ProfileChangePwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileChangePwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileChangePwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
