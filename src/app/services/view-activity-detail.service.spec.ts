import { TestBed } from '@angular/core/testing';

import { ViewActivityDetailService } from './view-activity-detail.service';

describe('ViewActivityDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViewActivityDetailService = TestBed.get(ViewActivityDetailService);
    expect(service).toBeTruthy();
  });
});
