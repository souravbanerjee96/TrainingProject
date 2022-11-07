import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ServicerequestguardService } from './servicerequestguard.service';

describe('ServicerequestguardService', () => {
  let service: ServicerequestguardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient,HttpHandler]
    });
    service = TestBed.inject(ServicerequestguardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
