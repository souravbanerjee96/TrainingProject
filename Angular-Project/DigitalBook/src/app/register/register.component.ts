import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { userAuth } from '../models/userData';
import { LoginServiceService } from '../services/login-service.service';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  constructor(private loginService:LoginServiceService,private router:Router) { }

  regData:userAuth=new userAuth();
  ngOnInit(): void {
  }

  regUser(){
    this.loginService.register(this.regData).subscribe(res=>console.log(res));
    this.router.navigate(['login/auth']);
  }

}
