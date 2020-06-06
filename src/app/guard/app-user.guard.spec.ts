import { TestBed } from '@angular/core/testing';

import { AppUserGuard } from './app-user.guard';

describe('AppUserGuard', () => {
  let guard: AppUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AppUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
