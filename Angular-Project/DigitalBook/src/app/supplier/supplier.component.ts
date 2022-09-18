import { Component, OnInit } from '@angular/core';
import { Supplier } from './supplier.supplierModel';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginServiceService } from '../services/login-service.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html'
})
export class SupplierComponent implements OnInit{

  ngOnInit():void{
    this.getSharedData();
  }
  private _baseURL='https://localhost:44372/api/Supplier/';
  isEditSupplier = false;
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
     this.SupplierModels=_input;
   }
   postSuccess(){
     this.getSharedData();
   }
  SupplierModel: Supplier=new Supplier();
  SupplierModels:Array<Supplier> = new Array<Supplier>();


  showSupplier(){
    // this.SupplierModels.push(this.SupplierModel);
    // console.log(this.SupplierModel);
    if(this.SupplierModel.SupplierSalary > 0 && this.SupplierModel.SupplierCode != '' && this.SupplierModel.SupplierName != '')
    this.http.post(this._baseURL,this.SupplierModel).subscribe(res=>this.postSuccess());
    this.SupplierModel=new Supplier();
  }
  SelectforEditSupplier(_input:any) {
    this.SupplierModel=_input;
  }
  idCus?:any = undefined;
  editSupplier(){
    //console.log(this.SupplierModel);
    this.idCus = this.SupplierModel;
    //console.log(this._baseURL+this.idCus.id);
    this.http.put(this._baseURL+this.idCus.Id,this.SupplierModel).subscribe(res=>this.getSharedData());
    this.isEditSupplier=false;
  }
  clearInput(){
    window.location.reload();
  }
  dropSupplier(_input:number)
  {
    this.http.delete(this._baseURL+_input).subscribe(res=>this.getSharedData());
  }
  SupplierIdValidator()
  {
    if (this.SupplierModel.SupplierCode == '')
    alert('Supplier Code Cannot Be Empty !! ');
  if(this.SupplierModel.SupplierName == '')
  alert('Supplier Name Cannot Be Empty !! ');
  if(this.SupplierModel.SupplierSalary <= 0)
  alert('Supplier Salary Cannot Be 0 !! ');
  }

}
