import { HttpClient } from '@angular/common/http';
import { Component, NgModule, OnInit } from '@angular/core';
import { Customer } from './customer.customerModel';

@Component({
  selector: 'app-root',
  templateUrl: './customer.component.html'
})
export class CustomerComponent implements OnInit {
  title = 'MyFirstProject';
  private _baseURL = 'http://localhost:3000/customer';
  ngOnInit(): void {
    this.GetDataFromServer();
  }
  GetDataFromServer() {
    this.http.get(this._baseURL).subscribe(res => this.Success(res));
  }
  Success(input: any) {
    this.CustomerModels = input;
  }
  constructor(private http: HttpClient) {

  }
  PostSuccess(){
    this.GetDataFromServer();
  }

  CustomerModel: Customer = new Customer();
  CustomerModels: Array<Customer> = new Array<Customer>();


  showCustomer() {
    // this.CustomerModels.push(this.CustomerModel);
    // console.log(this.CustomerModel);
    this.http.post(this._baseURL,this.CustomerModel).subscribe(res=>this.PostSuccess());
    this.CustomerModel = new Customer();
  }
  editCustomer(_input:any) {
    this.CustomerModel=_input;
  }
  dropCustomer() {
    this.CustomerModels.pop();
  }
  customerIdValidator() {
    if (this.CustomerModel.CustomerCode == '') {
      alert('Customer Code Cannot Be Empty !! ');
      return false;
    }
    return true;
  }
}
