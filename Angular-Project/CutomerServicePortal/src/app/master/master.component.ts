import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from '../services/login-service.service';
import * as $ from "jquery";
@Component({
  selector: 'app-root',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit {
  today: number = Date.now();

  constructor(private _auth: LoginServiceService) {
    setInterval(() => { this.today = Date.now() }, 1);
    
    $(window).bind("load", function () {
      $('#work-in-progress').fadeOut(300);
    });
  }
  userNameCust: string = '';
  userName: string = '';
  ngOnInit(): void {
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
  
  logoutUser() {
    this._auth.logout();
  }


}
