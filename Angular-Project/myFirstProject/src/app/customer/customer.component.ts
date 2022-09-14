import { HttpClient } from '@angular/common/http';
import { Component, Input, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Customer } from './customer.customerModel';
import { CustomerModule } from './customer.module';

@Component({
  selector: 'app-root',
  templateUrl: './customer.component.html'
})
export class CustomerComponent implements OnInit {
  title = 'MyFirstProject';
  private _baseURL = 'http://localhost:3000/customer/';
  isEditCustomer = false;

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
  SelectforEditCustomer(_input:any) {
    this.CustomerModel=_input;
  }
  idCus?:any = undefined;
  editCustomer(){
    //console.log(this.CustomerModel);
    this.idCus = this.CustomerModel;
    //console.log(this._baseURL+this.idCus.id);
    this.http.put(this._baseURL+this.idCus.id,this.CustomerModel).subscribe(res=>this.GetDataFromServer());
    this.isEditCustomer=false;
  }
  clearInput(){
    window.location.reload();
  }
  dropCustomer(_input:number) {
    console.log(this._baseURL+_input);
    this.http.delete(this._baseURL+_input).subscribe(res=>this.GetDataFromServer());
  }
  customerIdValidator() {
    if (this.CustomerModel.CustomerCode == '') {
      alert('Customer Code Cannot Be Empty !! ');
      return false;
    }
    return true;
  }
}
