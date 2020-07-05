import { TestBed } from '@angular/core/testing';

import { DeliveryAreaService } from './delivery-area.service';

describe('DeliveryAreaService', () => {
  let service: DeliveryAreaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliveryAreaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
