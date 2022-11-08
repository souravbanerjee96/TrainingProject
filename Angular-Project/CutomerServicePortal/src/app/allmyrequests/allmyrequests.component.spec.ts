import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { FormBuilder, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginServiceService } from '../services/login-service.service';
import { AllmyrequestsComponent } from './allmyrequests.component';

describe('AllmyrequestsComponent', () => {
  let component: AllmyrequestsComponent;
  let fixture: ComponentFixture<AllmyrequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        FormsModule,
        CommonModule,
        ReactiveFormsModule
      ],
      providers: [HttpClient, DatePipe, FormBuilder, HttpHandler, LoginServiceService],
      declarations: [AllmyrequestsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AllmyrequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have GetallRequests', async(() => {
    fixture = TestBed.createComponent(AllmyrequestsComponent);
    component = fixture.debugElement.componentInstance;
    let data = component.getallmyRequests();
    expect(data).toEqual();
  }));

  it('should format name', async(() => {
    fixture = TestBed.createComponent(AllmyrequestsComponent);
    component = fixture.debugElement.componentInstance;
    var obj = "Abcvvvsishjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjsdsdsdsdsd";
    let data = component.formatName(obj);
    expect(data).toEqual('Abcvvvsishjjjjjjjjjjjjjjjjj...');
  }));

  it('should format time', async(() => {
    fixture = TestBed.createComponent(AllmyrequestsComponent);
    component = fixture.debugElement.componentInstance;
    var obj = "2022-10-30 13:10:31.167";
    let data = component.timeFormat(obj);
    expect(data).toEqual('2022/10/30 1:10:31 PM');
  }));

  it('should submit user comment', async(() => {
    fixture = TestBed.createComponent(AllmyrequestsComponent);
    component = fixture.debugElement.componentInstance;
    let data = component.submitUserComment({});
    expect(data).toEqual();
  }));

  it('should implement delete request', async(() => {
    fixture = TestBed.createComponent(AllmyrequestsComponent);
    component = fixture.debugElement.componentInstance;
    let data = component.deleteReq();
    expect(data).toEqual();
  }));

  it('should implement update request', async(() => {
    fixture = TestBed.createComponent(AllmyrequestsComponent);
    component = fixture.debugElement.componentInstance;
    let data = component.updateReqs();
    expect(data).toEqual();
  }));


  it('should detect any change between objects', async(() => {
    fixture = TestBed.createComponent(AllmyrequestsComponent);
    component = fixture.debugElement.componentInstance;
    let data = component.detectChangeobj({"a":1},{"a":2});
    expect(data).toEqual(false);
  }));

  it('should Capture Edit Request', async(() => {
    fixture = TestBed.createComponent(AllmyrequestsComponent);
    component = fixture.debugElement.componentInstance;
    let data = component.captureEditreq(1);
    expect(data).toEqual();
  }));

  it('should Capture Edit Object', async(() => {
    fixture = TestBed.createComponent(AllmyrequestsComponent);
    component = fixture.debugElement.componentInstance;
    let data = component.captureEditreq({});
    expect(data).toEqual();
  }));

});
