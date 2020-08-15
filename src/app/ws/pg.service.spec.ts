import { TestBed } from '@angular/core/testing';

import { PgService } from './pg.service';

describe('PgService', () => {
  let service: PgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
