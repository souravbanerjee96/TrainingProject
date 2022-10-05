import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { orderDetails } from '../models/userData';
import jsPDF from 'jspdf';
const pdfMake = require('pdfmake/build/pdfmake.js');
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
var htmlToPdfmake = require("html-to-pdfmake");
import * as $ from "jquery";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-purchasehist',
  templateUrl: './purchasehist.component.html',
  styleUrls: ['./purchasehist.component.css']
})
export class PurchasehistComponent implements OnInit {

  constructor(private http: HttpClient, private _router: Router, public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.getuserOrder();
  }

  @ViewChild('pdfTable') pdfTable: ElementRef | undefined;

  filtersLoaded: Promise<boolean> | undefined;
  private _baseURL = 'https://localhost:44320/api/Reader/';
  userName: any;
  readerId: any;
  bookIdtoRefund: any;
  purchaseHist: Array<orderDetails> = new Array<orderDetails>();
  newDate: any;
  refresh() {
    window.location.reload();
  }

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
      this.filtersLoaded = Promise.resolve(true);
    },
      err => {
        console.log(err);
        alert(err.error.name);
      })
  }
  refundOrder(_input: any) {
    document.getElementById('bookRefund')?.click();
    this.bookIdtoRefund = _input;

  }
  cofirmRefund() {
    this.http.get<any>(this._baseURL + 'refund?purchaseId=' + this.bookIdtoRefund).subscribe(res => {
      document.getElementById('myrefundSuccess')?.click();
    },
      err => {
        console.log(err);
        document.getElementById('myrefundfailed')?.click();
      })
  }

  downloadInvoice(_input: any) {
    delete _input.Image;
    const doc = new jsPDF();
    this.pdfDatainit();
    //console.log('Got date: '+this.newDate);
    //const pdfTable = this.pdfTable?.nativeElement;
    var html = htmlToPdfmake(_input);
    let docDefinition = {
      content: [
        {
          text: "Digital Book v1.0",
          fontSize: 16,
          alignment: "center",
          color: "#047886",
        },
        {
          text: "INVOICE",
          fontSize: 20,
          bold: true,
          alignment: "center",
          decoration: "underline",
          color: "skyblue",
        },
        {
          text: "Customer Details",
          style: "sectionHeader",
        },
        {
          columns: [
            [
              {
                text: this.userName.toUpperCase(),
                bold: true
              }
            ],
            [
              {
                text: "Date: " + this.newDate,
                alignment: 'right'
              },
              {
                text: 'Bill No : ' + _input.InvoiceNo + '\n\n\n\n',
                alignment: 'right'
              }
            ]
          ]
        },
        {
          text: 'Book Name : ' + _input.Title + '\n\n',
          alignment: 'center'
        },
        {
          text: 'Category: ' + _input.Category + '\n\n',
          alignment: 'center'
        },
        {
          text: 'Amount Paid : ' + _input.Price + '\n\n\n',
          alignment: 'center'
        },
        {
          text: 'Purchased On : ' + this.datepipe.transform(_input.PurchaseTime, 'yyyy/MM/dd MMM d, y, h:mm:ss a') + '\n\n',
          alignment: 'center'
        },
        {
          text: 'Payment ID : ' + _input.PaymentId + '\n\n',
          alignment: 'center'
        }
      ],
      footer: {
        text: 'This document is computer generated and does not require any Signature in order to be considered valid' + '\n\n',
        alignment: 'center'
      },
      styles: {
        sectionHeader: {
          bold: true,
          decoration: "underline",
          fontSize: 14,
          margin: [0, 15, 0, 15],
        },
        footer: {
          fontSize: 8,
          margin: [0, 25, 0, 17],
          alignment: 'center'
        }
      },
    };
    pdfMake.createPdf(docDefinition).open();
    pdfMake.createPdf(docDefinition).download('Invoice_'+_input.InvoiceNo+'.pdf');
  }
  pdfDatainit() {
    this.newDate = new Date().toLocaleDateString();
  }
}
