import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  })
  constructor(private api: ApiService, private location: Location, private router: Router, private snackbar: MatSnackBar, private shared: SharedService) {}

  login(){
    const data = this.loginForm.value
    this.api.genericPost('admin-login', data).subscribe(
      (res:any) => {
        this.snackbar.open("Login Success", "Ok", {duration: 3000})
        this.shared.set('currentUser', JSON.stringify(res), 'session')
        this.router.navigate(['/dashboard/home'])  
      },
      (error:any) => {
        return this.snackbar.open(`Incorrect Details: ${error.error}`, 'Ok', { duration: 3000 });
      }
    )
  }

  cancel(){
    this.loginForm.reset()
  }

}
