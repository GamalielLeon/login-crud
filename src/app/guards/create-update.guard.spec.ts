import { TestBed } from '@angular/core/testing';

import { CreateUpdateGuard } from './create-update.guard';

xdescribe('CreateUpdateGuard', () => {
  let guard: CreateUpdateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CreateUpdateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
