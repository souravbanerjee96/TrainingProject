import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from '../services/login-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './master.component.html'
})
export class MasterComponent implements OnInit {

  constructor(private _auth:LoginServiceService) { }

  ngOnInit(): void {
  }

  isLogin(flag:Boolean):Boolean{
    if(flag)
    return this._auth.isLoggedin();
    else
    return !this._auth.isLoggedin();
  }
  logoutUser(){
    this._auth.logout();
  }
  

}
