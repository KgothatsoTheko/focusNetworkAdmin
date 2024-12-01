import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-information',
  templateUrl: './add-information.component.html',
  styleUrls: ['./add-information.component.scss']
})
export class AddInformationComponent {

  infoForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', [Validators.required])
  })

  constructor(private dialog:MatDialogRef<AddInformationComponent>, private api: ApiService, private snackbar: MatSnackBar) {

  }

  addInfo(){
    const infoData = this.infoForm.value
    this.api.genericPost('add-information', infoData).subscribe(
      (res:any) => {
        this.snackbar.open("Added Quote", "Ok", {duration: 3000})
        this.dialog.close()
      },
      (error:any) => {
        return this.snackbar.open(`Error: ${error}`, 'Ok', { duration: 3000 });
      }
    )
    
  }

  cancel(){
    this.dialog.close()
  }

}
