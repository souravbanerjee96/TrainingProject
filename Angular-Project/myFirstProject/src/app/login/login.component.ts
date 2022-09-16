import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from '../services/login-service.service';
import { userAuth } from '../models/userData';
import { Router, RouterConfigurationFeature } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  constructor(private loginService:LoginServiceService,private _router:Router) { }

  ngOnInit(): void {
  }
  userA:userAuth=new userAuth();

  loginUser(){
    this.loginService.login(this.userA).subscribe(res=>{
      localStorage.setItem('token',res.token);
      //console.log(res);
    });
    this._router.navigate(['']);
  }

}
