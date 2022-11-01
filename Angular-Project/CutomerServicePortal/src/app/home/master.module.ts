import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { MasterComponent } from '../master/master.component';
import { RegisterComponent } from '../register/register.component';
import { Mainroutes } from '../routing/mainroutes';
import { ServicerequestguardService } from '../services/servicerequestguard.service';
import { LoginServiceService } from '../services/login-service.service';
import { HomeComponent } from './home.component';
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [
    HomeComponent,
    MasterComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(Mainroutes),
    HttpClientModule
  ],
  providers: [ServicerequestguardService,LoginServiceService,DatePipe],
  bootstrap: [MasterComponent]
})
export class MasterModule { }