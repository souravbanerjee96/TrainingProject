import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from '../services/login-service.service';
import { allmyBooks } from '../models/userData';

@Component({
  selector: 'app-allmybooks',
  templateUrl: './allmybooks.component.html',
  styleUrls: ['./allmybooks.component.css']
})
export class AllmybooksComponent implements OnInit {

  constructor(private http: HttpClient, private _loginS: LoginServiceService) {
    this.getallmyBooks();
  }
  private _baseURL = 'https://localhost:44320/api/Author/getallmyBooks/';
  ngOnInit(): void {
  }
  _allmyBooks: Array<allmyBooks> = new Array<allmyBooks>();
  myBook: allmyBooks = new allmyBooks();

  getallmyBooks() {
    //console.log('Author Id :: ' + this.myBook.AuthorId);
    var _iObj={"AuthorId":this.myBook.AuthorId};
    this.http.post<any>(this._baseURL, _iObj).subscribe(res => {
      this._allmyBooks = res;
      //console.log('Data :: ' + res);
    },
      err => {
        console.log(err);
      });
  }






}
