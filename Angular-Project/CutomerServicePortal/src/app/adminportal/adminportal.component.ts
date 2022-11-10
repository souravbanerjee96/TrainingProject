import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalVariable } from '../global';
import { adminreq } from './adminportal.model';

@Component({
  selector: 'app-adminportal',
  templateUrl: './adminportal.component.html',
  styleUrls: ['./adminportal.component.css']
})
export class AdminportalComponent implements OnInit {

  private _baseURL = GlobalVariable.BASE_API_URL + 'ServiceResolution';
  adminReq: adminreq = new adminreq();
  adminReqs: Array<adminreq> = new Array<adminreq>();
  dataloaded: boolean = false;
  updated: boolean = true;
  filtersLoaded: Promise<boolean> | undefined;
  closedReqflag: boolean = false;
  constructor(private http: HttpClient, private _router: Router, public datepipe: DatePipe) {

  }

  ngOnInit(): void {
    this.getallRequests();
  }

  formatName(input: any): any {
    if (input.length > 15)
      return input.substring(0, 15) + '...'
    else
      return input;
  }

  dayDiff(input: any): any {
    const date1 = new Date().valueOf();
    const date2 = new Date(input).valueOf();
    const diffTime = (date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    //console.log(diffDays);
    return diffDays;
  }

  checkRequest(e: any) {
    if (e.target.checked) {
      this.closedReqflag = true;
      //console.log("Checked...");     
    }
    else
      this.closedReqflag = false;
    //console.log("Not Checked...");
  }

  getallRequests() {
    this.dataloaded = false;
    this.http.get<any>(this._baseURL).subscribe(res => {
      this.filtersLoaded = Promise.resolve(true);
      this.adminReqs = res;
      //console.log(res);
      window.setTimeout(() => {
        this.dataloaded = true;
      }, 1000);
    },
      err => {
        this.dataloaded = true;
        this.filtersLoaded = Promise.resolve(true);
        alert('Error loading data ! Try after sometime Admin...');
        console.log(err);

      })
  }
  updateRequest(input: any) {
    this.updated = false;
    input.AdminID = Number(localStorage.getItem('adminId'));
    this.http.post(this._baseURL, input).subscribe(res => {
      //console.log(input);
      window.setTimeout(() => {
        this.updated = true;
        this.getallRequests();
      }, 1000);
    },
      err => {
        this.updated = true;
        alert('Error updating data ! Try after sometime Admin...');
        console.log(err);
      })

  }

}
