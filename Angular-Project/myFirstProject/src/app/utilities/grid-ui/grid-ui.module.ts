import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Customer } from 'src/app/customer/customer.customerModel';
import { SupplierModule } from 'src/app/supplier/supplier.module';
import { GridUiComponent } from './grid-ui.component';

@NgModule({
  declarations: [
    GridUiComponent
  ],
  imports: [CommonModule],
  exports: [GridUiComponent,CommonModule],
  providers: [],
})
export class GridUIModule { }
