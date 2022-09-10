import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CustomerComponent } from './customer.component';
import { RouterModule } from '@angular/router';
import { customerroutes } from '../routing/customerroutes';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    CustomerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(customerroutes)
  ],
  providers: [],
  bootstrap: [CustomerComponent]
})
export class CustomerModule { }
