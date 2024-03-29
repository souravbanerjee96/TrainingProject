import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { authorroutes } from '../routing/authorroutes';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { GridUiComponent } from '../utilities/grid-ui/grid-ui.component';
import { GridUIModule } from '../utilities/grid-ui/grid-ui.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginServiceService } from '../services/login-service.service';
import { TokenInceptorService } from '../services/tokeninceptorservice';
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
  providers: [],
  bootstrap: [LoginComponent]
})
export class LoginModule { }
