import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from '../services/login-service.service';
import { userAuth } from '../models/userData';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./style.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginServiceService, private _router: Router,
    private _toast:NgToastService) { }

  ngOnInit(): void {

  }
  userA: userAuth = new userAuth();
  Errormsg: any = 'default';
  Errorflag: any = false;

  loginUser() {
    this.loginService.login(this.userA).subscribe(res => {
      localStorage.setItem('token', res.token);
      localStorage.setItem('userId',res.userId);
      localStorage.setItem('AuthorId',res.AuthorId);
      //console.log(res);
      this._toast.success({ detail: "Success Message", summary: "You have been Signed in successfully", duration: 5000});
      //this._router.navigate(['author/add']);
      this.Errormsg = 'ok';
      window.setTimeout(() => {
        this._router.navigate(['author/add']);
        this.Errorflag=0;
      }, 1000);
      document.getElementById('loginSuccess')?.click();
    },
      (err) => {
        this.Errorflag=true;
        this._toast.error({ detail: "Error Message",  summary:"User id or password is wrong", duration:5000});
        if (err.status == 401) {
          this.Errormsg = 'Incorrect Login !! ';
          document.getElementById('loginFail')?.click();
        }
        else {
          this.Errormsg = 'Some Error Occurred !! ';
          document.getElementById('loginFail')?.click();
        }
        window.setTimeout(() => {
          this._router.navigate(['login/auth']);
          this.Errorflag=0;
        }, 1000);
        //document.getElementById('btnErrormsg')?.click();
      });

  }





}
