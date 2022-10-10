import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from '../services/login-service.service';
import { allmyBooks } from '../models/userData';
import { NgToastService } from 'ng-angular-popup';
import { author } from './allmybooks.Model';
import * as $ from "jquery";
import { Router } from '@angular/router';
import { GlobalVariable } from '../global';
@Component({
  selector: 'app-allmybooks',
  templateUrl: './allmybooks.component.html',
  styleUrls: ['./allmybooks.component.css']
})
export class AllmybooksComponent implements OnInit {

  constructor(private http: HttpClient, private _loginS: LoginServiceService, private _router:Router) {
    this.getallmyBooks();
  }
  private _baseURL = GlobalVariable.BASE_API_URL + 'Author';
  public _imgURL = GlobalVariable.IMG_URL;
  _deleteBookId: number = 0;
  ngOnInit(): void {
   
  }
  filtersLoaded: Promise<boolean> | undefined;
  _allmyBooks: Array<allmyBooks> = new Array<allmyBooks>();
  imagedata: any;
  _prevState: any;
  updateErrorMsg: any;
  myBook: allmyBooks = new allmyBooks();
  authorModel: author = new author();
  getallmyBooks() {
    //console.log('Author Id :: ' + this.myBook.AuthorId);
    var _iObj = { "AuthorId": this.myBook.AuthorId };
    this.http.post<any>(this._baseURL +'/'+ 'getallmyBooks', _iObj).subscribe(res => {
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
    this.http.delete(this._baseURL +'/'+ this._deleteBookId).subscribe(res => {
      console.log(res);
      window.location.reload();
    },
      err => {
        console.log(err);
      });
  }
  captureEditbook(_input: any) {
    this._prevState = _input;
    this.authorModel = new author();
    //console.log(_input);
    this._prevState.IsActive == '1' || this._prevState.IsActive == 'Yes' ? this._prevState.IsActive = 'Yes' : this._prevState.IsActive = 'No';
    this.authorModel = this._prevState;
    //console.log(this.authorModel);
    document.getElementById('btnEditBook')?.click();
    this._prevState = undefined;
  }
  onFileSelected(_input: any) {
    this.imagedata = _input.target.files[0];
    this.authorModel.Image = this.imagedata.name;
    console.log('Image Captured = ' + this.imagedata.name);
  }
  updatebooks() {
    this.authorModel.IsActive == 'Yes' || this.authorModel.IsActive == '1' ? this.authorModel.IsActive = '1' : this.authorModel.IsActive = '0';

    const formdata = new FormData();
    formdata.append('BookData', JSON.stringify(this.authorModel));

    if (this.imagedata != null || this.imagedata != undefined)
      formdata.append('BookImg', this.imagedata, this.imagedata.name);

    //console.log(bookOBJ);
    this.http.put(this._baseURL +'/'+ 'editBook' +'/'+ this.authorModel.Id, formdata).subscribe(res => {
      console.log(res);
      //this.bookAddSuccess = 1;
      document.getElementById('btnsuccessEdit')?.click();
      window.setTimeout(()=>{
        document.getElementById('btnSuccessEditClose')?.click();
        window.location.reload();
      },500);
    },
      err => {
        document.getElementById('buttonCloseEditBook')?.click();
        console.log(err);
        //this.updateErrorMsg = err.error.message;
        document.getElementById('btnfailedEdit')?.click();
      });


  }




}
