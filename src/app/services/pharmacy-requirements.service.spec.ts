import { TestBed } from '@angular/core/testing';

import { PharmacyRequirementsService } from './pharmacy-requirements.service';

describe('PharmacyRequirementsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PharmacyRequirementsService = TestBed.get(PharmacyRequirementsService);
    expect(service).toBeTruthy();
  });
});
