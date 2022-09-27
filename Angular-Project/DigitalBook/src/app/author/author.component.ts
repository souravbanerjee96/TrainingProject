import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { author } from './author.authorModel';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginServiceService } from '../services/login-service.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./css/style.css']
})
export class AuthorComponent implements OnInit {

  ngOnInit(): void {
    //this.getSharedData();
  }
  @ViewChild('myInputVariable', {static: false})
  myInput!: ElementRef;


  imagedata: any;
  bookAddSuccess = 0;
  bookErrorMsg = '';
  private _baseURL = 'https://localhost:44320/api/Author/';
  isEditauthor = false;
  getSharedData() {
    this.http.get(this._baseURL).subscribe(res => this.getSuccess(res),
      (err) => {
        if (err.status == 401)
          this._loginS.logout();
      }
    );
  }
  constructor(private http: HttpClient, private _loginS: LoginServiceService) {

  }
  getSuccess(_input: any) {
    this.authorModels = _input;
  }
  postSuccess() {
    this.getSharedData();
  }
  authorModel: author = new author();
  authorModels: Array<author> = new Array<author>();

  onFileSelected(_input: any) {
    this.imagedata = _input.target.files[0];
    this.authorModel.Image = this.imagedata.name;
    console.log('Image Captured = ' + this.imagedata.name);
  }
  addbooks(_input:any) {
    const formdata = new FormData();
    let bookOBJ = _input.value;
    bookOBJ["AuthorId"] = this.authorModel.AuthorId;
    formdata.append('BookData', JSON.stringify(bookOBJ));

    if(this.imagedata!=null || this.imagedata!=undefined)
      formdata.append('BookImg', this.imagedata, this.imagedata.name);

    //console.log(bookOBJ);
    this.http.post(this._baseURL, formdata).subscribe(res => {
      console.log(res);
      this.bookAddSuccess = 1;
      document.getElementById('myBookSuccess')?.click();
      this.myInput.nativeElement.value = "";
      this.authorModel = new author();
    },
      err => {
        console.log(err);
        this.bookErrorMsg = err;
        document.getElementById('bookAddfailed')?.click();
      });
    
    
  }
  SelectforEditauthor(_input: any) {
    this.authorModel = _input;
  }
  idCus?: any = undefined;
  editauthor() {
    //console.log(this.authorModel);
    this.idCus = this.authorModel;
    //console.log(this._baseURL+this.idCus.id);
    this.http.put(this._baseURL + this.idCus.Id, this.authorModel).subscribe(res => this.getSharedData());
    this.isEditauthor = false;
  }
  clearInput() {
    window.location.reload();
  }
  dropauthor(_input: number) {
    this.http.delete(this._baseURL + _input).subscribe(res => this.getSharedData());
  }
  authorTest() {
    window.alert("ok");
  }
}
