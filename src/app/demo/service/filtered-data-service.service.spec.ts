import { TestBed } from '@angular/core/testing';

import { FilteredDataServiceService } from './filtered-data-service.service';

describe('FilteredDataServiceService', () => {
  let service: FilteredDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilteredDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
