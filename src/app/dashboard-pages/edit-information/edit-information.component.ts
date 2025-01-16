import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-edit-information',
  templateUrl: './edit-information.component.html',
  styleUrls: ['./edit-information.component.scss']
})
export class EditInformationComponent {

  infoForm: FormGroup;
  
    constructor(
      private dialog: MatDialogRef<EditInformationComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any, // Inject booking data
      private api: ApiService,
      private snackbar: MatSnackBar
    ) {
  
      // Initialize the form with the data
      this.infoForm = new FormGroup({
        title: new FormControl(data?.title, Validators.required),
        description: new FormControl(data?.description, Validators.required),
      });
  
    }
  
    cancel() {
      this.dialog.close();
    }
  
    editInfo() {
  
    // Prepare the updated mentor data
    const updatedForm = {
      ...this.infoForm.value,
    };
      
  
      this.api.genericUpdate(`update-information/${this.data._id}`, updatedForm).subscribe(
        (res) => {
          this.snackbar.open('Information updated successfully', 'Close', { duration: 3000 });
          this.dialog.close(true); // Indicate success to parent component
        },
        (err) => {
          this.snackbar.open('Failed to update Information', 'Close', { duration: 3000 });
          console.error('Error updating Information:', err);
        }
      );
    }
}
