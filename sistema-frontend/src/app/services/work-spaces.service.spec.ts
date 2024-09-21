import { TestBed } from '@angular/core/testing';

import { WorkSpacesService } from './work-spaces.service';

describe('WorkSpacesService', () => {
  let service: WorkSpacesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkSpacesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
