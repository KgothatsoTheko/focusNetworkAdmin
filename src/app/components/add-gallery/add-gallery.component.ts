import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-gallery',
  templateUrl: './add-gallery.component.html',
  styleUrls: ['./add-gallery.component.scss']
})
export class AddGalleryComponent {

  galleryForm = new FormGroup({
    imageUrl: new FormControl('', Validators.required)
  })

  constructor(private dialog:MatDialogRef<AddGalleryComponent>, private api: ApiService, private snackbar: MatSnackBar) {

  }

  addInfo(){
    const infoData = this.galleryForm.value
    this.api.genericPost('add-gallery', infoData).subscribe(
      (res:any) => {
        this.snackbar.open("Added Galley", "Ok", {duration: 3000})
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
