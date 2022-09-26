import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from '../services/login-service.service';
import { userAuth } from '../models/userData';
import { Router, RouterConfigurationFeature } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginServiceService, private _router: Router) { }

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
      this.Errormsg = 'ok';
      window.setTimeout(() => {
        this._router.navigate(['author/add']);
        this.Errorflag=0;
      }, 1000);
      //document.getElementById('loginSuccess')?.click();
    },
      (err) => {
        this.Errorflag=true;
        if (err.status == 401) {
          this.Errormsg = 'Incorrect Login !! ';
          //document.getElementById('loginFail')?.click();
        }
        else {
          this.Errormsg = 'Some Error Occurred !! ';
        }
        window.setTimeout(() => {
          this._router.navigate(['login']);
          this.Errorflag=0;
        }, 1000);
        //document.getElementById('btnErrormsg')?.click();
      });

  }





}
