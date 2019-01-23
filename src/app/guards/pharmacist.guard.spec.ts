import { TestBed, async, inject } from '@angular/core/testing';

import { PharmacistGuard } from './pharmacist.guard';

describe('PharmacistGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PharmacistGuard]
    });
  });

  it('should ...', inject([PharmacistGuard], (guard: PharmacistGuard) => {
    expect(guard).toBeTruthy();
  }));
});
