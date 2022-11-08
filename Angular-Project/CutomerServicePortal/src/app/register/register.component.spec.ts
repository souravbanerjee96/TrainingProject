import { DatePipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { asyncScheduler } from 'rxjs';
import { userAuth } from '../models/userData';
import { LoginServiceService } from '../services/login-service.service';
import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    let router: Router
    let loginS: LoginServiceService
    userA: userAuth ;
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      providers: [HttpClient, DatePipe,FormBuilder],
      declarations: [RegisterComponent]
    })
      .compileComponents();
    router = TestBed.inject(Router);
    loginS = TestBed.inject(LoginServiceService);
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it('match registration header',()=>{
    const fixture = TestBed.createComponent(RegisterComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h3')?.textContent).toContain('Registration Form');
  });

  it('should register user', async(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.debugElement.componentInstance;
    let data = component.regUser();
    expect(data).toEqual();
  }));


});
