import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CustomerComponent } from './customer.component';
import { RouterModule } from '@angular/router';
import { customerroutes } from '../routing/customerroutes';
import { CommonModule } from '@angular/common';
import { GridUiComponent } from '../utilities/grid-ui/grid-ui.component';
import { GridUIModule } from '../utilities/grid-ui/grid-ui.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    CustomerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(customerroutes),
    GridUIModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [CustomerComponent]
})
export class CustomerModule { }
