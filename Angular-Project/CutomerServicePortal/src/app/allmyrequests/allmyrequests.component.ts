import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from '../services/login-service.service';
import { allmyRequests, updateReq } from './allmyrequests.Model';
import { Router } from '@angular/router';
import { GlobalVariable } from '../global';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-allmyrequests',
  templateUrl: './allmyrequests.component.html',
  styleUrls: ['./allmyrequests.component.css']
})
export class AllmyrequestsComponent implements OnInit {

  constructor(private http: HttpClient, private _loginS: LoginServiceService, private _router: Router, public datepipe: DatePipe) {
    this.getallmyRequests();
  }
  private _baseURL = GlobalVariable.BASE_API_URL + 'ServiceReq';
  private _resolutionURL = GlobalVariable.BASE_API_URL + 'ServiceResolution';
  public _imgURL = GlobalVariable.IMG_URL;
  _deleteReqId: number = 0;
  ngOnInit(): void {

  }
  filtersLoaded: Promise<boolean> | undefined;
  dataloaded: boolean = false;
  //userCmntdataloaded:boolean=false;
  imagedata: any;
  _prevState: any;
  updateErrorMsg: any;
  allmyReq: allmyRequests = new allmyRequests();
  userCmnt: allmyRequests = new allmyRequests();
  userCmntClone: allmyRequests = new allmyRequests();
  updateReq: updateReq = new updateReq();
  allmyReqs: Array<allmyRequests> = new Array<allmyRequests>();
  currdt: Date = new Date();
  currD = this.currdt.setDate(this.currdt.getDate() + 1);
  todayDate = this.datepipe.transform((this.currD), 'yyyy-MM-dd');
  getallmyRequests() {
    this.dataloaded=false;
    this.filtersLoaded = Promise.resolve(false);
    var _iObj = this.allmyReq.userID;
    this.http.get<any>(this._baseURL + '/' + _iObj).subscribe(res => {
      this.allmyReqs = res;
      this.filtersLoaded = Promise.resolve(true);
      this.dataloaded = true;
      //console.log('Data :: ' + res);
    },
      err => {
        console.log(err);
        this.dataloaded = true;
        alert('Some error occurred , Please Re-login or try later');
        this.filtersLoaded = Promise.resolve(true);
      });
  }
  timeFormat(input: any): any {
    return this.datepipe.transform(input, 'yyyy/MM/dd h:mm:ss a')
  }
  formatName(input: any): any {
    if (input.length > 30)
      return input.substring(0, 27) + '...'
    else
      return input;
  }

  captureObjforUsercmnt(input: any) {
    this.userCmnt = Object.assign({}, this.userCmnt, input);
    this.userCmntClone = Object.assign({}, this.userCmntClone, input);
    //console.log(this.userCmnt);
  }

  detectChangeobj(obj1: any, obj2: any): boolean {
    return JSON.stringify(obj1) == JSON.stringify(obj2);
  }

  submitUserComment(input: any) {
    this.dataloaded = false;
    input.IsUserAccepted=parseInt(input.IsUserAccepted);
    console.log(input);
    this.http.put(this._resolutionURL, input).subscribe(res => {
      console.log(res);
      window.setTimeout(() => {
        this.dataloaded = true;
        document.getElementById('closeUserComment')?.click();
        window.location.reload();
      }, 1500);
    },
      err => {
        console.log(err);
        this.dataloaded = true;
        alert('Some error occurred , Please Re-login or try later');
      });
  }

  captureidreq(_input: any) {
    this._deleteReqId = _input;
    document.getElementById('btnDelreq')?.click();
  }
  deleteReq() {
    this.dataloaded = false;
    console.log("Captured Data : " + this._deleteReqId);
    this.http.delete(this._baseURL + '/' + this._deleteReqId).subscribe(res => {
      console.log(res);
      this.dataloaded = true;
      window.location.reload();
    },
      err => {
        console.log(err);
        this.dataloaded = true;
        alert('Some error occurred , Please Re-login or try later');
      });
  }
  captureEditreq(_input: any) {
    this.updateReq = Object.assign({}, this.updateReq, _input);
    document.getElementById('btnEditReq')?.click();
  }

  updateReqs() {
    this.dataloaded = false;
    this.http.put(this._baseURL + '/' + this.updateReq.Id, this.updateReq).subscribe(res => {
      console.log(res);
      //this.ReqAddSuccess = 1;
      document.getElementById('btnsuccessEdit')?.click();
      window.setTimeout(() => {
        this.dataloaded = true;
        document.getElementById('btnSuccessEditClose')?.click();
        window.location.reload();
      }, 1500);
    },
      err => {
        this.dataloaded = true;
        alert('Some error occurred , Please Re-login or try later');
        document.getElementById('buttonCloseEditReq')?.click();
        console.log(err);
        document.getElementById('btnfailedEdit')?.click();
      });


  }




}
