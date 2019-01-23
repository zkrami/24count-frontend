import { TestBed } from '@angular/core/testing';

import { PharmacyOrdersService } from './pharmacy-orders.service';

describe('PharmacyOrdersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PharmacyOrdersService = TestBed.get(PharmacyOrdersService);
    expect(service).toBeTruthy();
  });
});
