import { Component, OnInit } from '@angular/core';
import { Supplier } from './supplier.supplierModel';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html'
})
export class SupplierComponent implements OnInit{

  ngOnInit():void{
    this.getSharedData();
  }
  private _baseURL='http://localhost:3000/supplier/';
  isEditSupplier = false;
  getSharedData(){
    this.http.get(this._baseURL).subscribe(res=>this.getSuccess(res));
  }
  constructor(private http:HttpClient) {

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
    this.http.put(this._baseURL+this.idCus.id,this.SupplierModel).subscribe(res=>this.getSharedData());
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
   if(this.SupplierModel.SupplierCode=='')
   {
     alert('Supplier Code Cannot Be Empty !! ');
     return false;
   } 
   return true;
  }

}
