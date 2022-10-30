import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { userAuth } from '../models/userData';
import { LoginServiceService } from '../services/login-service.service';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  regData: userAuth = new userAuth();
  Errormsg: any = null;
  reg_form: FormGroup;
  dataloaded: boolean = true;

  constructor(private loginService: LoginServiceService, private router: Router, fb: FormBuilder) {
    this.reg_form = fb.group({
      'Email': [null, Validators.compose([Validators.required, Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)])],
      'PhoneNo': [null, Validators.compose([Validators.required, Validators.pattern(/^[6-9]\d{9}$/)])],
      'PanNo': [null, Validators.compose([Validators.required, Validators.pattern(/([A-Z]){5}([0-9]){4}([A-Z]){1}$/)])],
      'FirstName': [null, Validators.required],
      'LastName': [null, Validators.required],
      'Password': [null, Validators.required],
      'DOB': [null, Validators.required],
      'Country': [null, Validators.required],
      'State': [null, Validators.required],
      'Address': [null, Validators.required],
      'ContactPref': [null, Validators.required],
    });
  }

  ngOnInit(): void {
  }

  regUser() {
    this.dataloaded = false;
    this.loginService.register(this.regData).subscribe(res => {
      this.dataloaded = true;
      this.router.navigate(['login/auth']);
    },
      err => {
        this.Errormsg = err.error.message;
        window.setTimeout(() => {
          this.Errormsg = null;
        }, 2000);
      });
  }

}
