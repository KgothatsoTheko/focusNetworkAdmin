import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-add-gallery',
  templateUrl: './add-gallery.component.html',
  styleUrls: ['./add-gallery.component.scss']
})
export class AddGalleryComponent {

  fileName:any | string="No Image"
  upload:any
  fileChoosen:any

  galleryForm: FormGroup

  constructor(private dialog:MatDialogRef<AddGalleryComponent>, private api: ApiService, private shared: SharedService, private snackbar: MatSnackBar) {
    this.galleryForm = new FormGroup({
      file: new FormControl('', Validators.required)
    })
  }

  uploadFile() {
    this.upload = document.getElementById('upload') as HTMLInputElement;
    this.fileChoosen = document.getElementById('file-choosen');

    if (this.upload && this.fileChoosen) {
        this.upload.addEventListener('change', (event: Event) => {
            const input = event.target as HTMLInputElement;
            if (input.files && input.files.length > 0) {
                const selectedFile = input.files[0];
                this.fileChoosen.textContent = selectedFile.name;

                const formData = new FormData();
                formData.append('file', selectedFile, selectedFile.name);

                this.api.genericPost('upload', formData).subscribe(
                    (response: any) => {
                        this.snackbar.open(`Success: ${response.message}`, 'Ok', { duration: 3000 });
                        console.log('Response:', response);
                        this.dialog.close()
                    },
                    (error: any) => {
                        this.snackbar.open(`Error: ${error.message || error}`, 'Ok', { duration: 3000 });
                        this.dialog.close()
                    }
                );
            }
        });
    }
}


  cancel(){
    this.dialog.close()
  }

}
