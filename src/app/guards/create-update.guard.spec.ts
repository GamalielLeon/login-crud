import { TestBed } from '@angular/core/testing';

import { CreateUpdateGuard } from './create-update.guard';

describe('CreateUpdateGuard', () => {
  let guard: CreateUpdateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CreateUpdateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
