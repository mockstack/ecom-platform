import { TestBed } from '@angular/core/testing';

import { ReportGenerateService } from './report-generate.service';

describe('ReportGenerateService', () => {
  let service: ReportGenerateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportGenerateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
