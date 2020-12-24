import { TestBed } from '@angular/core/testing';

import { CheckAttemptsService } from './check-attempts.service';

describe('CheckAttemptsService', () => {
  let service: CheckAttemptsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckAttemptsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
