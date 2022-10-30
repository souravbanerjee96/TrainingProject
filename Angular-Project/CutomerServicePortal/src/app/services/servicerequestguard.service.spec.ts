import { TestBed } from '@angular/core/testing';

import { ServicerequestguardService } from './servicerequestguard.service';

describe('ServicerequestguardService', () => {
  let service: ServicerequestguardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicerequestguardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
