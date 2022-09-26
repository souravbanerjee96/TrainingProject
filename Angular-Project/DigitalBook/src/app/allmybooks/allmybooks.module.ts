import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { authorroutes } from '../routing/authorroutes';
import { CommonModule } from '@angular/common';
import { GridUiComponent } from '../utilities/grid-ui/grid-ui.component';
import { GridUIModule } from '../utilities/grid-ui/grid-ui.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginServiceService } from '../services/login-service.service';
import { TokenInceptorService } from '../services/tokeninceptorservice';
import { AllmybooksComponent } from './allmybooks.component';
import { allmybooksroutes } from '../routing/allmybooksroutes';

@NgModule({
  declarations: [
    AllmybooksComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(allmybooksroutes),
    GridUIModule,
    HttpClientModule
  ],
  providers: [LoginServiceService,{provide:HTTP_INTERCEPTORS,useClass:TokenInceptorService,multi:true}],
  bootstrap: [AllmybooksComponent]
})
export class AllmyBooksModule { }
