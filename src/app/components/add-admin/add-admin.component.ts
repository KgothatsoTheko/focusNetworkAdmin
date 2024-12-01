import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss']
})
export class AddAdminComponent {

  adminForm = new FormGroup({
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })

  constructor(private dialog:MatDialogRef<AddAdminComponent>, private location: Location, private api: ApiService, private router: Router, private snackbar: MatSnackBar,) {

  }

  login() {
    const adminData = this.adminForm.value
    console.log("admin form", adminData);
    this.api.genericPost('add-admin', adminData).subscribe(
      (res:any) => {
        this.snackbar.open("Registered New Admin", "Ok", {duration: 3000})
        this.dialog.close()
      },
      (error:any) => {
        return this.snackbar.open(`Error: ${error}`, 'Ok', { duration: 3000 });
      }
    )
  }

  cancel() {
    this.dialog.close()
  }

}
