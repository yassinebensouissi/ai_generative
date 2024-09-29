import { TestBed } from '@angular/core/testing';

import { EyeMovementService } from './eye-movement.service';

describe('EyeMovementService', () => {
  let service: EyeMovementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EyeMovementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
