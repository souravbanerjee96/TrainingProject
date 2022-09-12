import { Component, OnInit } from '@angular/core';
import { Supplier } from './supplier.supplierModel';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html'
})
export class SupplierComponent {

  constructor() { }

  SupplierModel:Supplier=new Supplier();
  SupplierModels:Array<Supplier> = new Array<Supplier>();


  showSupplier(){
    this.SupplierModels.push(this.SupplierModel);
    console.log(this.SupplierModel);
    this.SupplierModel=new Supplier();
  }
  dropSupplier()
  {
    this.SupplierModels.pop();
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
