import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { readBooks } from '../models/userData';
import { GlobalVariable } from '../global';
@Component({
  selector: 'app-readbooks',
  templateUrl: './readbooks.component.html',
  styleUrls: ['./readbooks.component.css']
})
export class ReadbooksComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, public datepipe: DatePipe) {

   }

  ngOnInit(): void {
    this.readBooks();
  }
  filtersLoaded: Promise<boolean> | undefined;
  private _baseURL = GlobalVariable.BASE_API_URL + 'Reader';
  public _imgURL = GlobalVariable.IMG_URL;

  readerId: any;
  ReadbookDat: string = '';
  _readBook: Array<readBooks> = new Array<readBooks>();

  readBooks() {
    this.readerId = localStorage.getItem('readerId');
    this.http.get<any>(this._baseURL +'/'+ 'readbooks?readerID=' + this.readerId).subscribe(res => {
      this._readBook = res;
      this.filtersLoaded = Promise.resolve(true);
    },
      err => {
        console.log(err);
        alert(err);
      });
  }
  prepareBook(_data: any) {

    delete _data.Id;
    delete _data.PurchaseTime;
    delete _data.IsActive;
    delete _data.IsRefunded;
    delete _data.Id;

    const keys = Object.keys(_data);
    const values = Object.values(_data);
    const entries = Object.entries(_data);
    //console.log(keys);
    //console.log(values);
    this.ReadbookDat = '';
    for (var _i = 0; _i < Object.keys(_data).length; _i++) {
      if (values[_i] != null && values[_i] != '') {
        if (keys[_i] == 'Image')
          values[_i] = '<img class="media-object" src="'+ this._imgURL + values[_i] + '" width="300" height="200"/><br/>';

        this.ReadbookDat = this.ReadbookDat + values[_i] + '<br/>';
      }
    }
    //console.log(this.ReadbookDat);
    document.getElementById('btnReadBook')?.click();
  }

  formatDate(_input: Date): any {
    var val = this.datepipe.transform(_input, 'yyyy/MM/dd')
    return val;
  }

}
