import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginServiceService } from '../services/login-service.service';
import { TokenInceptorService } from '../services/tokeninceptorservice';
import { AdminportalComponent } from './adminportal.component';
import { adminroutes } from '../routing/adminroutes';

@NgModule({
  declarations: [
    AdminportalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(adminroutes),
    HttpClientModule
  ],
  providers: [LoginServiceService,DatePipe,{provide:HTTP_INTERCEPTORS,useClass:TokenInceptorService,multi:true}],
  bootstrap: [AdminportalComponent]
})
export class AdminPortalModule { }
