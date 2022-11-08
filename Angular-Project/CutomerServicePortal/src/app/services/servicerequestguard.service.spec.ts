import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ServicerequestguardService } from './servicerequestguard.service';

describe('ServicerequestguardService', () => {
  let service: ServicerequestguardService;
  let fixture: ComponentFixture<ServicerequestguardService>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler]
    });
    service = TestBed.inject(ServicerequestguardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
