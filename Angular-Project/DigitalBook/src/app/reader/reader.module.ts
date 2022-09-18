import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ReaderComponent } from './reader.component';
import { RouterModule } from '@angular/router';
import { readerroutes } from '../routing/readerroutes';
import { CommonModule } from '@angular/common';
import { GridUiComponent } from '../utilities/grid-ui/grid-ui.component';
import { GridUIModule } from '../utilities/grid-ui/grid-ui.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginServiceService } from '../services/login-service.service';
import { TokenInceptorService } from '../services/tokeninceptorservice';

@NgModule({
  declarations: [
    ReaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(readerroutes),
    GridUIModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [ReaderComponent]
})
export class ReaderModule { }
