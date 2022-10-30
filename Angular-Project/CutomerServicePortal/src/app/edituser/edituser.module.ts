import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginServiceService } from '../services/login-service.service';
import { TokenInceptorService } from '../services/tokeninceptorservice';
import { EdituserComponent } from './edituser.component';
import { edituserroutes } from '../routing/edituserroutes';

@NgModule({
  declarations: [
    EdituserComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(edituserroutes),
    HttpClientModule
  ],
  providers: [LoginServiceService,DatePipe,{provide:HTTP_INTERCEPTORS,useClass:TokenInceptorService,multi:true}],
  bootstrap: [EdituserComponent]
})
export class EditUserModule { }
