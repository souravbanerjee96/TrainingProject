import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { LoginComponent } from './login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgToastModule } from 'ng-angular-popup';
import { loginroutes } from '../routing/loginroutes';
@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(loginroutes),
    HttpClientModule,
    NgToastModule
  ],
  providers: [DatePipe],
  bootstrap: [LoginComponent]
})
export class LoginModule { }
