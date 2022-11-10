import { DatePipe } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginServiceService } from '../services/login-service.service';
import { AdminportalComponent } from './adminportal.component';

describe('AdminportalComponent', () => {
  let component: AdminportalComponent;
  let fixture: ComponentFixture<AdminportalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      providers: [HttpClient, DatePipe, FormBuilder, HttpHandler, LoginServiceService],
      declarations: [AdminportalComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AdminportalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Admin should have GetallRequests', async(() => {
    fixture = TestBed.createComponent(AdminportalComponent);
    component = fixture.debugElement.componentInstance;
    let data = component.getallRequests();
    expect(data).toEqual();
  }));

  it('should update request', async(() => {
    fixture = TestBed.createComponent(AdminportalComponent);
    component = fixture.debugElement.componentInstance;
    var obj = {};
    let data = component.updateRequest(obj);
    expect(data).toEqual();
  }));
  it('should format name', async(() => {
    fixture = TestBed.createComponent(AdminportalComponent);
    component = fixture.debugElement.componentInstance;
    let data = component.formatName('aaaaaaaaaaaaaaaaa');
    expect(data).toEqual('aaaaaaaaaaaaaaa...');
  }));
  it('should differentiate date', async(() => {
    fixture = TestBed.createComponent(AdminportalComponent);
    component = fixture.debugElement.componentInstance;
    let data = component.dayDiff('2022/12/09');
    expect(data).toEqual(30);
  }));

});
