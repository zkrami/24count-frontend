import { TestBed } from '@angular/core/testing';

import { RepositoryOrdersService } from './repository-orders.service';

describe('RepositoryOrdersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RepositoryOrdersService = TestBed.get(RepositoryOrdersService);
    expect(service).toBeTruthy();
  });
});
