import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { servicereq } from './servicerequest.Model';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { LoginServiceService } from '../services/login-service.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { GlobalVariable } from '../global';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-servicerequest',
  templateUrl: './servicerequest.component.html',
  styleUrls: ['./css/style.css']
})
export class ServicerequestComponent implements OnInit {
  mobile: boolean = false;
  public getScreenWidth: any;
  public getScreenHeight: any;
  ngOnInit(): void {
    // if (window.screen.width < 600) {
    //   this.mobile = true;
    // }
  }
  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.screen.width;
    this.getScreenHeight = window.screen.height;
    if (this.getScreenWidth < 600){
      //console.log(this.getScreenWidth);
      this.mobile = true;
    }
    else{
      //console.log(this.getScreenWidth);
      this.mobile = false;
    }
  }

  @ViewChild('myInputVariable', { static: false })
  myInput!: ElementRef;

  @ViewChild('requestForm') myForm!: NgForm;

  dataloaded: boolean = true;
  imagedata: any;
  reqAddSuccess = 0;
  reqErrorMsg = '';
  req_form: FormGroup;
  private _baseURL = GlobalVariable.BASE_API_URL + 'ServiceReq';
  isEditauthor = false;
  constructor(private http: HttpClient, private _loginS: LoginServiceService, fb: FormBuilder, public datepipe: DatePipe) {
    this.req_form = fb.group({
      'ServiceName': [null, Validators.required],
      'RequiredDate': [null, Validators.required],
      'ServiceType': [null, Validators.required],
      'ServiceDetails': [null, Validators.compose([Validators.required, Validators.pattern(/^.{50,5000}$/s)])],
    });

  }
  currdt: Date = new Date();
  currD = this.currdt.setDate(this.currdt.getDate() + 1);
  todayDate = this.datepipe.transform((this.currD), 'yyyy-MM-dd');

  getSuccess(_input: any) {
    this.serviceReqs = _input;
  }
  serviceReq: servicereq = new servicereq();
  serviceReqs: Array<servicereq> = new Array<servicereq>();

  addrequest() {
    //console.log(this.serviceReq);
    this.dataloaded = false;
    this.http.post<any>(this._baseURL, this.serviceReq).subscribe(res => {
      console.log(res);
      this.reqAddSuccess = 1;
      this.dataloaded = true;
      document.getElementById('myreqSuccess')?.click();
      //this.myInput.nativeElement.value = "";
      this.myForm.form.markAsPristine();
      this.myForm.form.markAsUntouched();
      this.serviceReq = new servicereq();
    },
      err => {
        this.dataloaded = true;
        document.getElementById('myreqFailed')?.click();
        console.log("error = > " + JSON.stringify(err.error.errors));
        //this.reqErrorMsg = err.error.message;
      });


  }

}
