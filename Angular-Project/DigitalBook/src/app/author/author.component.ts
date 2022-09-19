import { Component, OnInit } from '@angular/core';
import { author } from './author.authorModel';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginServiceService } from '../services/login-service.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html'
})
export class AuthorComponent implements OnInit{

  ngOnInit():void{
    this.getSharedData();
  }
  private _baseURL='https://localhost:44372/api/author/';
  isEditauthor = false;
  getSharedData(){
    this.http.get(this._baseURL).subscribe(res=>this.getSuccess(res),
    (err)=>{
      if (err.status == 401)
      this._loginS.logout();
    }
    );
  }
  constructor(private http:HttpClient,private _loginS:LoginServiceService) {

   }
   getSuccess(_input:any){
     this.authorModels=_input;
   }
   postSuccess(){
     this.getSharedData();
   }
  authorModel: author=new author();
  authorModels:Array<author> = new Array<author>();


  showauthor(){
    // this.authorModels.push(this.authorModel);
    // console.log(this.authorModel);
    //if(this.authorModel.authorSalary > 0 && this.authorModel.authorCode != '' && this.authorModel.authorName != '')
    this.http.post(this._baseURL,this.authorModel).subscribe(res=>this.postSuccess());
    this.authorModel=new author();
  }
  SelectforEditauthor(_input:any) {
    this.authorModel=_input;
  }
  idCus?:any = undefined;
  editauthor(){
    //console.log(this.authorModel);
    this.idCus = this.authorModel;
    //console.log(this._baseURL+this.idCus.id);
    this.http.put(this._baseURL+this.idCus.Id,this.authorModel).subscribe(res=>this.getSharedData());
    this.isEditauthor=false;
  }
  clearInput(){
    window.location.reload();
  }
  dropauthor(_input:number)
  {
    this.http.delete(this._baseURL+_input).subscribe(res=>this.getSharedData());
  }
  // authorIdValidator()
  // {
  //   if (this.authorModel.authorCode == '')
  //   alert('author Code Cannot Be Empty !! ');
  // if(this.authorModel.authorName == '')
  // alert('author Name Cannot Be Empty !! ');
  // if(this.authorModel.authorSalary <= 0)
  // alert('author Salary Cannot Be 0 !! ');
  // }

}
