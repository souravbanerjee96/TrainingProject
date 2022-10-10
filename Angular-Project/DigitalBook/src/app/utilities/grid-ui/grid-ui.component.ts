import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login-service.service';
import { __createBinding } from 'tslib';
import { readerAuth } from '../../models/userData'
import { GlobalVariable } from 'src/app/global';
@Component({
  selector: 'app-grid-ui',
  templateUrl: './grid-ui.component.html',
  styleUrls: ['../loginModal.css']
})
export class GridUiComponent implements OnInit {

  private _baseURL = GlobalVariable.BASE_API_URL + 'Reader';
  public _imgURL = GlobalVariable.IMG_URL;
  Readmsg: string = '';
  email_reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  gridColumn: Array<any> = new Array<any>();
  gridBook: Array<any> = new Array<any>();
  gridData: Array<any> = new Array<any>();

  constructor(private _router: Router, private _loginS: LoginServiceService) { }

  ngOnInit(): void {
  }
  ConfirmDelete = false;
  ConfirmEdit = false;
  _readerAuth: readerAuth = new readerAuth();

  @Input("grid-columns")
  set SetGridColums(_gridcolumn: Array<any>) {
    this.gridColumn = _gridcolumn;
  }

  @Input("read-book-columns")
  set SetBookColums(_gridcolumn: Array<any>) {
    this.gridBook = _gridcolumn;
  }

  @Input("grid-data")
  set SetGridData(_griddata: Array<any>) {
    this.gridData = _griddata;
  }

  @Output("grid-selected")
  emiemitter: EventEmitter<any> = new EventEmitter<any>();

  @Output("grid-deleted")
  delemitter: EventEmitter<number> = new EventEmitter<number>();

  @Output("book-selected")
  bookemitter: EventEmitter<any> = new EventEmitter<any>();

  SelectGridData(_selected: any) {
    this.emiemitter.emit(_selected);
  }
  DeleteGridData(_selected: any) {
    console.log(_selected);
    this.delemitter.emit(_selected.Id);
  }
  readBook(_data: any) {

    const keys = Object.keys(_data);
    const values = Object.values(_data);
    const entries = Object.entries(_data);
    //console.log( values );
    this.Readmsg = '';
    //this.Readmsg = '<img class="media-object" src="https://localhost:44320/Images/alice1.jpg" width="75" height="90"/><br/>';
    for (var _i = 0; _i < this.gridBook.length; _i++) {
      if (values[_i] != null && values[_i] != '') {
        if (keys[_i] == 'Image')
          values[_i] = '<img class="media-object" src="' + this._imgURL + values[_i] + '" width="84" height="100"/><br/>';

        this.Readmsg = this.Readmsg + this.gridBook[_i] + values[_i] + '<br/>';
      }
    }
    console.log(this.Readmsg);
    document.getElementById('btnReadBook')?.click();
  }

  readerLogin() {
    document.getElementById('btnReaderLogin')?.click();

  }
  isreaderLogged(): Boolean {
    return this._loginS.isLoggedinReader();
  }

  buybook(_inp: any) {
    //console.log(_inp);
    localStorage.setItem('bookId', _inp.Id);
    localStorage.setItem('bookImage', _inp.Image);
    localStorage.setItem('bookName', _inp.Title);
    localStorage.setItem('bookPrice', _inp.Price);
    this._router.navigate(['book/buy']);
  }

  callReaderlogin() {
    this._loginS.readerRegister(this._readerAuth);

    //console.log(this._readerAuth);
  }
  
  priceParser(_input: any): string {
    return (parseFloat(_input) + parseFloat(_input)*15/100).toFixed(2);
  }
}
