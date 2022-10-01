import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private _loginURL = "https://localhost:44320/api/Authentication/";
  private _registerURL = "https://localhost:44320/api/Authentication/";
  constructor(private http: HttpClient, private _router: Router) { }

  login(_input: any) {
    //console.log(this._loginURL);
    localStorage.clear();
    return this.http.post<any>(this._loginURL + 'Validate/', _input);
  }
  register(_input: any) {
    console.log(_input);
    return this.http.post<any>(this._registerURL + 'Register/', _input);
  }
  gettoken() {
    if (localStorage.getItem('token') != null)
      return localStorage.getItem('token');
    else
      return localStorage.getItem('r_token');
  }
  isLoggedin(): Boolean {
    return !!localStorage.getItem('token');
  }
  logout() {
    localStorage.clear();
    this._router.navigate(['']);
  }
  readerRegister(_input: any) {
    //console.log(this._loginURL);
    localStorage.clear();
    return this.http.post<any>(this._loginURL + 'Register-Reader/', _input).subscribe(
      res => {
        console.log(res);
        localStorage.setItem('r_token', res.r_token);
        localStorage.setItem('readerId', res.readerId);
        localStorage.setItem('readerName', res.readerName);
        window.location.reload();
      },
      err => {
        console.log(err);
      }
    );
  }

  isLoggedinReader(): Boolean {
    return !!localStorage.getItem('r_token');
  }

  gettokenReader() {
    return localStorage.getItem('r_token');
  }
  // logoutReader(){
  //   localStorage.clear();
  //   this._router.navigate(['']);
  // }

}
