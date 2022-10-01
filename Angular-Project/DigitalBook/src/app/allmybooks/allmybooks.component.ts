import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from '../services/login-service.service';
import { allmyBooks } from '../models/userData';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-allmybooks',
  templateUrl: './allmybooks.component.html',
  styleUrls: ['./allmybooks.component.css']
})
export class AllmybooksComponent implements OnInit {

  constructor(private http: HttpClient, private _loginS: LoginServiceService,private _toast:NgToastService) {
    this.getallmyBooks();
  }
  private _baseURL = 'https://localhost:44320/api/Author/';
  _deleteBookId:number=0;
  ngOnInit(): void {
  }
  _allmyBooks: Array<allmyBooks> = new Array<allmyBooks>();
  myBook: allmyBooks = new allmyBooks();

  getallmyBooks() {
    //console.log('Author Id :: ' + this.myBook.AuthorId);
    var _iObj={"AuthorId":this.myBook.AuthorId};
    this.http.post<any>(this._baseURL+'getallmyBooks/', _iObj).subscribe(res => {
      this._toast.success({ detail: "Success Message", summary: "Book Fetched successfully", duration: 5000});
      this._allmyBooks = res;
      //console.log('Data :: ' + res);
    },
      err => {
        console.log(err);
      });
  }
  captureidBook(_input:any){
    //console.log("Captured Data : "+_input);
    this._deleteBookId=_input;
    document.getElementById('btnDelBook')?.click();
  }
  deleteBook() {
    console.log("Captured Data : "+this._deleteBookId);
    this.http.delete(this._baseURL+this._deleteBookId).subscribe(res=>{
      console.log(res);
      window.location.reload();
    },
    err=>
    {
      console.log(err);
    });
  }






}
