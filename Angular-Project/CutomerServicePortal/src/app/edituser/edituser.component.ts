import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { userAuth } from '../models/userData';
import { LoginServiceService } from '../services/login-service.service';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalVariable } from '../global';
@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {

  private _baseURL = GlobalVariable.BASE_API_URL + 'Users';
  regData: userAuth = new userAuth();
  Errormsg: any = null;
  reg_form: FormGroup;
  dataloaded: boolean = true;

  constructor(private loginService: LoginServiceService, private router: Router,private http:HttpClient, fb: FormBuilder) {
    this.reg_form = fb.group({
      'Email': [null, Validators.compose([Validators.required, Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)])],
      'PhoneNo': [null, Validators.compose([Validators.required, Validators.pattern(/^[6-9]\d{9}$/)])],
      'PanNo': [null, Validators.compose([Validators.required, Validators.pattern(/([A-Z]){5}([0-9]){4}([A-Z]){1}$/)])],
      'FirstName': [null, Validators.required],
      'LastName': [null, Validators.required],
      'Password': [null, Validators.required],
      'DOB': [null, Validators.required],
      'Country': [null, Validators.required],
      'State': [null, Validators.required],
      'Address': [null, Validators.required],
      'ContactPref': [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.getUserdata();
  }

  getUserdata(){
    this.dataloaded = false;
    let CustomerId=localStorage.getItem('CustomerId');
    this.http.get<any>(this._baseURL+'/'+'getUser'+'/'+ CustomerId).subscribe(res => {
      this.dataloaded = true;
      this.regData=res;
      console.log(res);
      //window.location.reload();
    },
      err => {
        this.dataloaded = true;
        this.Errormsg = 'Error getting data...';
        window.setTimeout(() => {
          this.Errormsg = null;
        }, 2000);
      });
  }

  updateUser() {
    this.dataloaded = false;
    let CustomerId=localStorage.getItem('CustomerId');
    this.http.put<any>(this._baseURL+'/'+'updateUser'+'/'+ CustomerId,this.regData).subscribe(res => {
      this.dataloaded = true;
      //this.getUserdata();
      //console.log(res);
      window.location.reload();
    },
      err => {
        this.dataloaded = true;
        this.Errormsg = 'Error updating data...';
        window.setTimeout(() => {
          this.Errormsg = null;
        }, 2000);
      });
    }

}
