import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from '../services/login-service.service';
import * as $ from "jquery";
import { adminAuth } from '../models/userData';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit {
  today: number = Date.now();

  constructor(private _auth: LoginServiceService, public _router: Router) {
    setInterval(() => { this.today = Date.now() }, 1);

    $(window).bind("load", function () {
      $('#work-in-progress').fadeOut(300);
    });
  }
  userNameCust: string = '';
  userName: string = '';
  dataloaded: boolean = true;
  errorflag:any = false;
  successflag:any = false;
  _adminAuth: adminAuth = new adminAuth();
  ngOnInit(): void {
  }

  callAdminlogin() {
    this.dataloaded = false;
    this._auth.loginAdmin(this._adminAuth).subscribe(res => {
      localStorage.setItem('a_token', res.a_token);
      localStorage.setItem('userName', res.userName);
      localStorage.setItem('adminId', res.adminId);
      this.successflag=true;
      window.setTimeout(() => {
        this.successflag=false;
        this.dataloaded = true;
        document.getElementById('closeAdminLogin')?.click();
        this._router.navigate(['adminportal']);
      }, 1500);
    },
      err => {
        this.dataloaded = true;
        this.errorflag=true;
        window.setTimeout(() => {
          this.errorflag = false;
        }, 2000);
      });

    //console.log(this._readerAuth);
  }

  isLogin(flag: Boolean): Boolean {
    if (flag) {
      var userName = localStorage.getItem('userName');
      this.userNameCust = atob(userName == null ? '' : userName);
      return this._auth.isLoggedin();
    }
    else
      return !this._auth.isLoggedin();
  }

  isLoginAdmin(flag: Boolean): Boolean {
    if (flag) {
      var userName = localStorage.getItem('userName');
      this.userNameCust = atob(userName == null ? '' : userName);
      return this._auth.isLoggedinAdmin();
    }
    else
      return !this._auth.isLoggedinAdmin();
  }

  logoutUser() {
    this._auth.logout();
  }


}
