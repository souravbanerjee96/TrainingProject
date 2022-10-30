import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { ServicerequestComponent } from './servicerequest.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginServiceService } from '../services/login-service.service';
import { TokenInceptorService } from '../services/tokeninceptorservice';
import { servicereqroutes } from '../routing/servicereqroutes';

@NgModule({
  declarations: [
    ServicerequestComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(servicereqroutes),
    HttpClientModule
  ],
  providers: [LoginServiceService,DatePipe,{provide:HTTP_INTERCEPTORS,useClass:TokenInceptorService,multi:true}],
  bootstrap: [ServicerequestComponent]
})
export class ServiceRequestModule { }
