import { TestBed } from '@angular/core/testing';

import { ReviewtermsService } from './reviewterms.service';

describe('ReviewtermsService', () => {
  let service: ReviewtermsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReviewtermsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
