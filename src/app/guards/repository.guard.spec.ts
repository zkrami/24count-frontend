import { TestBed, async, inject } from '@angular/core/testing';

import { RepositoryGuard } from './repository.guard';

describe('RepositoryGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RepositoryGuard]
    });
  });

  it('should ...', inject([RepositoryGuard], (guard: RepositoryGuard) => {
    expect(guard).toBeTruthy();
  }));
});
