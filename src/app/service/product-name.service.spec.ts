import { TestBed } from '@angular/core/testing';

import { ProductNameService } from './product-name.service';

describe('ProductNameService', () => {
  let service: ProductNameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductNameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
