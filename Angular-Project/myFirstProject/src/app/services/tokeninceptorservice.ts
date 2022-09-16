import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginServiceService } from './login-service.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInceptorService implements HttpInterceptor{

  constructor(private injector:Injector) { }

  intercept(req: HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{
      let authservice=this.injector.get(LoginServiceService);
      let tokenizedreq=req.clone({
          headers:req.headers.set('Authorization','bearer '+authservice.gettoken())
      });
      return next.handle(tokenizedreq);
  }
}
