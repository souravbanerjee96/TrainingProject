import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from '../services/login-service.service';
import { userAuth } from '../models/userData';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./style.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginServiceService, private _router: Router) { }

  ngOnInit(): void {

  }
  userA: userAuth = new userAuth();
  Errormsg: any = 'default';
  Errorflag: any = false;
  dataloaded: boolean = true;
  email_reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  loginUser() {
    this.dataloaded = false;

    this.loginService.login(this.userA).subscribe(res => {
      localStorage.setItem('token', res.token);
      localStorage.setItem('userName', res.userName);
      localStorage.setItem('CustomerId', res.CustomerId);
      this.Errormsg = 'ok';
      window.setTimeout(() => {
        this.dataloaded = true;
        this._router.navigate(['allmyrequests/all']);
        this.Errorflag = 0;
      }, 1000);
      document.getElementById('loginSuccess')?.click();
    },
      (err) => {
        this.Errorflag = true;
        this.dataloaded = true;
        if (err.status == 401) {
          this.Errormsg = 'Incorrect Login !! ';
          document.getElementById('loginFail')?.click();
        }
        else {
          this.Errormsg = 'Some Error Occurred !! ';
          document.getElementById('loginFail')?.click();
        }
        window.setTimeout(() => {
          //this._router.navigate(['login/auth']);
          this.Errorflag = 0;
        }, 1000);
        //document.getElementById('btnErrormsg')?.click();
      });

  }





}
