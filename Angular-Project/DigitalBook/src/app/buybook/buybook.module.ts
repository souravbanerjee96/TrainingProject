import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GridUiComponent } from '../utilities/grid-ui/grid-ui.component';
import { GridUIModule } from '../utilities/grid-ui/grid-ui.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginServiceService } from '../services/login-service.service';
import { TokenInceptorService } from '../services/tokeninceptorservice';
import { BuybookComponent } from './buybook.component';
import { buybookroutes } from '../routing/buybookroutes';

@NgModule({
  declarations: [
    BuybookComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(buybookroutes),
    GridUIModule,
    HttpClientModule
  ],
  providers: [LoginServiceService,{provide:HTTP_INTERCEPTORS,useClass:TokenInceptorService,multi:true}],
  bootstrap: [BuybookComponent]
})
export class BuyBookModule { }
