import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { GridUIModule } from '../utilities/grid-ui/grid-ui.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginServiceService } from '../services/login-service.service';
import { TokenInceptorService } from '../services/tokeninceptorservice';
import { ReadbooksComponent } from './readbooks.component';
import { readbooksroutes } from '../routing/readbooksroutes';

@NgModule({
  declarations: [
    ReadbooksComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(readbooksroutes),
    GridUIModule,
    HttpClientModule
  ],
  providers: [LoginServiceService,DatePipe,{provide:HTTP_INTERCEPTORS,useClass:TokenInceptorService,multi:true}],
  bootstrap: [ReadbooksComponent]
})
export class ReadBooksModule { }
