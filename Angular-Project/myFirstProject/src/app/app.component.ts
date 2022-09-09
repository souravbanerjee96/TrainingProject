import { Component } from '@angular/core';
import { Customer } from './app.customerModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myFirstProject';

  CustomerModel:Customer=new Customer();
  CustomerModels:Array<Customer> = new Array<Customer>();


  showCustomer(){
    this.CustomerModels.push(this.CustomerModel);
    console.log(this.CustomerModel);
    this.CustomerModel=new Customer();
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
