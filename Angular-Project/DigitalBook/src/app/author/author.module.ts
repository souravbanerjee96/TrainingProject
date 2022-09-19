import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { authorroutes } from '../routing/authorroutes';
import { CommonModule } from '@angular/common';
import { AuthorComponent } from './author.component';
import { GridUiComponent } from '../utilities/grid-ui/grid-ui.component';
import { GridUIModule } from '../utilities/grid-ui/grid-ui.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginServiceService } from '../services/login-service.service';
import { TokenInceptorService } from '../services/tokeninceptorservice';

@NgModule({
  declarations: [
    AuthorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(authorroutes),
    GridUIModule,
    HttpClientModule
  ],
  providers: [LoginServiceService,{provide:HTTP_INTERCEPTORS,useClass:TokenInceptorService,multi:true}],
  bootstrap: [AuthorComponent]
})
export class AuthorModule { }
