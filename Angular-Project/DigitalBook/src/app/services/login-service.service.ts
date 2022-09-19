import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private _loginURL = "https://localhost:44320/api/Authentication/";
  private _registerURL = "https://localhost:44320/api/Authentication/";
  constructor(private http:HttpClient,private _router:Router) { }

  login(_input:any){
    //console.log(this._loginURL);
    return this.http.post<any>(this._loginURL,_input);
  }
  register(_input:any){
    console.log(_input);
    return this.http.post<any>(this._registerURL,_input);
  }
  gettoken(){
    return localStorage.getItem('token');
  }
  isLoggedin():Boolean{
    return !!localStorage.getItem('token');
  }
  logout(){
    localStorage.removeItem('token');
    this._router.navigate(['']);
  }

}
