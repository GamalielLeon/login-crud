import { TestBed } from '@angular/core/testing';

import { CheckAttempsService } from './check-attemps.service';

describe('CheckAttempsService', () => {
  let service: CheckAttempsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckAttempsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
