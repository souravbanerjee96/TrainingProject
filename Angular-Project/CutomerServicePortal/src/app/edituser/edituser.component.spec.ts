import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { LoginServiceService } from '../services/login-service.service';

import { EdituserComponent } from './edituser.component';

describe('EdituserComponent', () => {
  let component: EdituserComponent;
  let fixture: ComponentFixture<EdituserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EdituserComponent],
      providers: [HttpClient, HttpHandler, LoginServiceService, FormBuilder]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EdituserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('match registration header', () => {
    const fixture = TestBed.createComponent(EdituserComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h3')?.textContent).toContain('User Details Update');
  });
  it('should have Getuser', async(() => {
    fixture = TestBed.createComponent(EdituserComponent);
    component = fixture.debugElement.componentInstance;
    let data = component.getUserdata();
    expect(data).toEqual();
  }));

  it('should have Updateuser', async(() => {
    fixture = TestBed.createComponent(EdituserComponent);
    component = fixture.debugElement.componentInstance;
    let data = component.updateUser();
    expect(data).toEqual();
  }));

});
