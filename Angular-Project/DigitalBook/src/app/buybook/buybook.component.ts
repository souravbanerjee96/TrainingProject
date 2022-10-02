import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { buyBook } from '../models/userData';
import * as $ from "jquery";

@Component({
  selector: 'app-buybook',
  templateUrl: './buybook.component.html',
  styleUrls: ['./buybook.component.css']
})
export class BuybookComponent implements OnInit {

  constructor(private http:HttpClient,private _router:Router) { }

  ngOnInit(): void {
    this.buybooksetData();
  }
  private _baseURL = 'https://localhost:44320/api/Reader/';
  _buybook: buyBook = new buyBook();
  bookImage: any;
  bookName: any;
  bookPrice: any;
  InvoiceNo:any;
  PaymentId:any;
  Errormsg:any=null;
  buybooksetData() {
    this.bookImage = localStorage.getItem('bookImage');
    this.bookName = localStorage.getItem('bookName');
    this.bookPrice = localStorage.getItem('bookPrice');
    this._buybook.BookiD = localStorage.getItem('bookId');
    this._buybook.Userid = localStorage.getItem('readerId');
  }

  buyBook() {
    //console.log(this._buybook);
    this.http.post<any>(this._baseURL+'CreateOrder/',this._buybook).subscribe(res=>{
      console.log(res);
      this.InvoiceNo=res.InvoiceNo;
      this.PaymentId=res.PaymentId;
      document.getElementById('bookBought')?.click();
      window.setTimeout(() => {
        document.getElementById('bookboughtClose')?.click();
        this._router.navigate(['purchase/history']);
      }, 10000);
      
    },
    err=>{
      this.Errormsg=err.error.message;
      console.log("BookOrder Error :: "+err.error.message);
      window.setTimeout(() => {
         $(".alert").fadeTo(500, 0).slideDown(500, function(){
        $(this).remove(); 
    });
      }, 1500);
    });
    this.Errormsg=null;
  }

}
