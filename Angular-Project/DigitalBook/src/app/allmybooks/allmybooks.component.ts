import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from '../services/login-service.service';
import { allmyBooks } from '../models/userData';
import { NgToastService } from 'ng-angular-popup';
import { author } from './allmybooks.Model';

@Component({
  selector: 'app-allmybooks',
  templateUrl: './allmybooks.component.html',
  styleUrls: ['./allmybooks.component.css']
})
export class AllmybooksComponent implements OnInit {

  constructor(private http: HttpClient, private _loginS: LoginServiceService, private _toast: NgToastService) {
    this.getallmyBooks();
  }
  private _baseURL = 'https://localhost:44320/api/Author/';
  _deleteBookId: number = 0;
  ngOnInit(): void {
  }
  filtersLoaded: Promise<boolean> | undefined;
  _allmyBooks: Array<allmyBooks> = new Array<allmyBooks>();
  imagedata: any;
  updateErrorMsg: any;
  myBook: allmyBooks = new allmyBooks();
  authorModel: author = new author();
  getallmyBooks() {
    //console.log('Author Id :: ' + this.myBook.AuthorId);
    var _iObj = { "AuthorId": this.myBook.AuthorId };
    this.http.post<any>(this._baseURL + 'getallmyBooks/', _iObj).subscribe(res => {
      this._toast.success({ detail: "Success Message", summary: "Book Fetched successfully", duration: 5000 });
      this._allmyBooks = res;
      this.filtersLoaded = Promise.resolve(true);
      //console.log('Data :: ' + res);
    },
      err => {
        console.log(err);
        this.filtersLoaded = Promise.resolve(true);
      });
  }
  captureidBook(_input: any) {
    //console.log("Captured Data : "+_input);
    this._deleteBookId = _input;
    document.getElementById('btnDelBook')?.click();
  }
  deleteBook() {
    console.log("Captured Data : " + this._deleteBookId);
    this.http.delete(this._baseURL + this._deleteBookId).subscribe(res => {
      console.log(res);
      window.location.reload();
    },
      err => {
        console.log(err);
      });
  }
  captureEditbook(_input: any) {
    this.authorModel = new author();
    _input.IsActive == '1' ? _input.IsActive = 'Yes' : _input.IsActive = 'No';
    this.authorModel = _input;
    document.getElementById('btnEditBook')?.click();
  }
  onFileSelected(_input: any) {
    this.imagedata = _input.target.files[0];
    this.authorModel.Image = this.imagedata.name;
    console.log('Image Captured = ' + this.imagedata.name);
  }
  updatebooks() {
    this.authorModel.IsActive == 'Yes' ? this.authorModel.IsActive = "1" : this.authorModel.IsActive = "0";
    console.log(this.authorModel);
    // const formdata = new FormData();
    // let bookOBJ = _input.value;
    // formdata.append('BookData', JSON.stringify(bookOBJ));

    // if (this.imagedata != null || this.imagedata != undefined)
    //   formdata.append('BookImg', this.imagedata, this.imagedata.name);

    // //console.log(bookOBJ);
    // this.http.post(this._baseURL+this.authorModel.Id, formdata).subscribe(res => {
    //   console.log(res);
    //   //this.bookAddSuccess = 1;
    //   //document.getElementById('myBookSuccess')?.click();
    // },
    //   err => {
    //     console.log(err);
    //     this.updateErrorMsg = err;
    //     document.getElementById('bookAddfailed')?.click();
    //   });


  }




}
