import { TestBed } from '@angular/core/testing';

import { SaveLocationService } from './save-location.service';

describe('SaveLocationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SaveLocationService = TestBed.get(SaveLocationService);
    expect(service).toBeTruthy();
  });
});
