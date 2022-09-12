import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { supplierroutes } from '../routing/supplierroutes';
import { CommonModule } from '@angular/common';
import { SupplierComponent } from './supplier.component';
import { GridUiComponent } from '../utilities/grid-ui/grid-ui.component';
import { GridUIModule } from '../utilities/grid-ui/grid-ui.module';

@NgModule({
  declarations: [
    SupplierComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(supplierroutes),
    GridUIModule
  ],
  providers: [],
  bootstrap: [SupplierComponent]
})
export class SupplierModule { }
