import { HttpClient } from '@angular/common/http';
import { Component, Input, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginServiceService } from '../services/login-service.service';
import { Customer } from './customer.customerModel';
import { CustomerModule } from './customer.module';

@Component({
  selector: 'app-root',
  templateUrl: './customer.component.html'
})
export class CustomerComponent implements OnInit {
  title = 'MyFirstProject';
  private _baseURL = 'https://localhost:44372/api/Customer/';
  isEditCustomer = false;

  ngOnInit(): void {
    this.GetDataFromServer();
  }

  constructor(private http: HttpClient,private _loginS:LoginServiceService) {

  }
  GetDataFromServer() {
    this.http.get(this._baseURL).subscribe(res => this.Success(res),
    (err)=>{
      if (err.status == 401)
      this._loginS.logout();
    }
      );
  }
  Success(input: any) {
    this.CustomerModels = input;
  }
  
  PostSuccess(){
    this.GetDataFromServer();
  }

  CustomerModel: Customer = new Customer();
  CustomerModels: Array<Customer> = new Array<Customer>();


  showCustomer() {
    // this.CustomerModels.push(this.CustomerModel);
    // console.log(this.CustomerModel);
    if(this.CustomerModel.CustomerSalary > 0 && this.CustomerModel.CustomerCode != '' && this.CustomerModel.CustomerName != '')
    this.http.post(this._baseURL,this.CustomerModel).subscribe(res=>this.PostSuccess());
    this.CustomerModel = new Customer();
  }
  SelectforEditCustomer(_input:any) {
    this.CustomerModel=_input;
  }
  idCus?:any = undefined;
  editCustomer(){
    console.log(this.CustomerModel);
    this.idCus = this.CustomerModel;
    console.log(this._baseURL+this.idCus.id);
    this.http.put(this._baseURL+this.idCus.Id,this.CustomerModel).subscribe(res=>this.GetDataFromServer(),res=>console.log(res));
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
    if (this.CustomerModel.CustomerCode == '')
      alert('Customer Code Cannot Be Empty !! ');
    if(this.CustomerModel.CustomerName == '')
    alert('Customer Name Cannot Be Empty !! ');
    if(this.CustomerModel.CustomerSalary <= 0)
    alert('Customer Salary Cannot Be 0 !! ');
  }
}
