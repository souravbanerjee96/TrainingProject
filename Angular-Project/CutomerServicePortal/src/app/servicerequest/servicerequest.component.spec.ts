import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginServiceService } from '../services/login-service.service';
import { ServicerequestComponent } from './servicerequest.component';

describe('ServicerequestComponent', () => {
  let component: ServicerequestComponent;
  let fixture: ComponentFixture<ServicerequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        ReactiveFormsModule
      ],
      providers: [HttpClient, DatePipe, FormBuilder, HttpHandler, LoginServiceService],
      declarations: [ServicerequestComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ServicerequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('match service request header',()=>{
    const fixture = TestBed.createComponent(ServicerequestComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Service Request');
  });

});
