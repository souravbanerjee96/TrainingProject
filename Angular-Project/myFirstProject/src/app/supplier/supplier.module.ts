import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { supplierroutes } from '../routing/supplierroutes';
import { CommonModule } from '@angular/common';
import { SupplierComponent } from './supplier.component';

@NgModule({
  declarations: [
    SupplierComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(supplierroutes)
  ],
  providers: [],
  bootstrap: [SupplierComponent]
})
export class SupplierModule { }
