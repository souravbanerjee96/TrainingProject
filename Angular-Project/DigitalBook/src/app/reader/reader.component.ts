import { HttpClient } from '@angular/common/http';
import { Component, Input, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginServiceService } from '../services/login-service.service';
import { Reader } from './reader.Model';
import { ReaderModule } from './reader.module';

@Component({
  selector: 'app-root',
  templateUrl: './reader.component.html'
})
export class ReaderComponent implements OnInit {
  private _baseURL = 'https://localhost:44320/api/Reader';
  isEditReader = false;

  ngOnInit(): void {
    //this.GetDataFromServer();
  }

  constructor(private http: HttpClient) {

  }
  GetDataFromServer() {
    console.log(this._baseURL+'?Title='+this.ReaderModel.Title+'&AuthorName='+this.ReaderModel.AuthorName+'&Publisher='
    +this.ReaderModel.Publisher+'&ReleasedDate='+this.ReaderModel.ReleasedDate);
    this.http.get
    (this._baseURL+'?Title='+this.ReaderModel.Title+'&AuthorName='+this.ReaderModel.AuthorName+'&Publisher='
    +this.ReaderModel.Publisher+'&ReleasedDate='+this.ReaderModel.ReleasedDate).subscribe(res => {
      this.Success(res);
      console.log(res);
    },
    (err)=>{
      // if (err.status == 401)
      // this._loginS.logout();
      console.log(err);
    }
      );
  }
  Success(input: any) {
    this.ReaderModels = input;
  }
  
  PostSuccess(){
    this.GetDataFromServer();
  }

  ReaderModel: Reader = new Reader();
  ReaderModels: Array<Reader> = new Array<Reader>();


  showBooks() {
    // this.ReaderModels.push(this.ReaderModel);
    // console.log(this.ReaderModel);
    this.http.post(this._baseURL,this.ReaderModel).subscribe(res=>this.PostSuccess());
  }
  // idCus?:any = undefined;
  // editReader(){
  //   console.log(this.ReaderModel);
  //   this.idCus = this.ReaderModel;
  //   console.log(this._baseURL+this.idCus.id);
  //   this.http.put(this._baseURL+this.idCus.Id,this.ReaderModel).subscribe(res=>this.GetDataFromServer(),res=>console.log(res));
  //   this.isEditReader=false;
  // }
  clearInput(){
    window.location.reload();
  }
  // dropReader(_input:number) {
  //   console.log(this._baseURL+_input);
  //   this.http.delete(this._baseURL+_input).subscribe(res=>this.GetDataFromServer());
  // }
  // ReaderIdValidator() {
  //   if (this.ReaderModel.ReaderCode == '')
  //     alert('Reader Code Cannot Be Empty !! ');
  //   if(this.ReaderModel.ReaderName == '')
  //   alert('Reader Name Cannot Be Empty !! ');
  //   if(this.ReaderModel.ReaderSalary <= 0)
  //   alert('Reader Salary Cannot Be 0 !! ');
  // }
}
