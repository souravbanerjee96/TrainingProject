import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { orderDetails } from '../models/userData';
import * as $ from "jquery";

@Component({
  selector: 'app-purchasehist',
  templateUrl: './purchasehist.component.html',
  styleUrls: ['./purchasehist.component.css']
})
export class PurchasehistComponent implements OnInit {

  constructor(private http: HttpClient, private _router: Router) { }

  ngOnInit(): void {
    this.getuserOrder();
  }
  private _baseURL = 'https://localhost:44320/api/Reader/';
  userName: any;
  readerId: any;
  bookIdtoRefund: any;
  purchaseHist: Array<orderDetails> = new Array<orderDetails>();

  finddateDiff(_input: any): any {
    var time = Date.now() - new Date(_input).getTime();
    var hours = Math.floor(time / (1000 * 60 * 60));
    return hours;
  }
  getuserOrder() {
    var userId = localStorage.getItem('readerName');
    this.userName = atob(userId == null ? '' : userId);
    this.readerId = localStorage.getItem('readerId');
    this.http.get<any>(this._baseURL + 'orderhist?readerID=' + this.readerId).subscribe(res => {
      this.purchaseHist = res;
      console.log(res);
    },
      err => {
        console.log(err);
        alert(err);
      })
  }
  refundOrder(_input: any) {
    document.getElementById('bookRefund')?.click();
    this.bookIdtoRefund = _input;

  }
  cofirmRefund() {
    this.http.get<any>(this._baseURL + 'refund?purchaseId=' + this.bookIdtoRefund).subscribe(res => {
      alert('Done');
      window.location.reload();
    },
      err => {
        console.log(err);
        alert(err);
      })
  }

}
