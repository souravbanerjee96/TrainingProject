import { Component, NgModule } from '@angular/core';
import { Customer } from './customer.customerModel';

@Component({
  selector: 'app-root',
  templateUrl: './customer.component.html'
})
export class CustomerComponent {
  title = 'MyFirstProject';

  CustomerModel:Customer=new Customer();
  CustomerModels:Array<Customer> = new Array<Customer>();


  showCustomer(){
    this.CustomerModels.push(this.CustomerModel);
    console.log(this.CustomerModel);
    this.CustomerModel=new Customer();
  }
  dropCustomer()
  {
    this.CustomerModels.pop();
  }
  customerIdValidator()
  {
   if(this.CustomerModel.CustomerCode=='')
   {
     alert('Customer Code Cannot Be Empty !! ');
     return false;
   } 
   return true;
  }
}
