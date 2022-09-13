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
  private _baseURL='http://localhost:3000/supplier';
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
  dropSupplier()
  {
    this.SupplierModels.pop();
  }
  editSupplier(_input:any){
    this.SupplierModel=_input;
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
