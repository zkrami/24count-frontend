import { TestBed } from '@angular/core/testing';

import { RepositoryItemsService } from './repository-items.service';

describe('RepositoryItemsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RepositoryItemsService = TestBed.get(RepositoryItemsService);
    expect(service).toBeTruthy();
  });
});
