import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalVariable } from '../global';
@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private _loginURL = GlobalVariable.BASE_API_URL + "Users";
  private _readerloginURL = GlobalVariable.BASE_API_URL + "ReaderAuth";
  private _registerURL = GlobalVariable.BASE_API_URL + "Users";
  constructor(private http: HttpClient, private _router: Router) { }

  login(_input: any) {
    //console.log(this._loginURL);
    localStorage.clear();
    return this.http.post<any>(this._loginURL + '/' + 'Login', _input);
  }
  register(_input: any) {
    console.log(_input);
    return this.http.post<any>(this._registerURL + '/' + 'Register', _input);
  }
  gettoken() {
    if (localStorage.getItem('token') != null)
      return localStorage.getItem('token');
    else
      return null;
  }
  isLoggedin(): Boolean {
    return !!localStorage.getItem('token');
  }
  logout() {
    localStorage.clear();
    this._router.navigate(['']);
  }
  

}
