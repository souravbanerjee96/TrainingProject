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
  userNameAuthor: string = '';
  userName: string = '';
  ngOnInit(): void {
  }


  isLogin(flag: Boolean): Boolean {
    if (flag) {
      var userId = localStorage.getItem('userId');
      this.userNameAuthor = atob(userId == null ? '' : userId);
      return this._auth.isLoggedin();
    }
    else
      return !this._auth.isLoggedin();
  }
  isLoginReader(flag: Boolean): Boolean {
    if (flag) {
      var userId = localStorage.getItem('readerName');
      this.userName = atob(userId == null ? '' : userId);
      return this._auth.isLoggedinReader();
    }
    else
      return !this._auth.isLoggedinReader();
  }
  logoutUser() {
    this._auth.logout();
  }


}
