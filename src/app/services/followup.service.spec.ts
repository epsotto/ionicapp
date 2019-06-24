import { TestBed } from '@angular/core/testing';

import { FollowupService } from './followup.service';

describe('FollowupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FollowupService = TestBed.get(FollowupService);
    expect(service).toBeTruthy();
  });
});
