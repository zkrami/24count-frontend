import { TestBed } from '@angular/core/testing';

import { ApiHttpClientService } from './api-http-client.service';

describe('ApiHttpClientService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiHttpClientService = TestBed.get(ApiHttpClientService);
    expect(service).toBeTruthy();
  });
});
