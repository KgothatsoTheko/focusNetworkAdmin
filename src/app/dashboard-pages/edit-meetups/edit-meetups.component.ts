import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-edit-meetups',
  templateUrl: './edit-meetups.component.html',
  styleUrls: ['./edit-meetups.component.scss']
})
export class EditMeetupsComponent {

  meetUpForm: FormGroup;

  constructor(
    private dialog: MatDialogRef<EditMeetupsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, // Inject booking data
    private api: ApiService,
    private snackbar: MatSnackBar
  ) {

    // Convert UTC date to local date
    const localDate = new Date(data?.date).toISOString().slice(0, 10);

    // Initialize the form with the data
    this.meetUpForm = new FormGroup({
      title: new FormControl(data?.title, Validators.required),
      date: new FormControl(localDate, Validators.required),
      location: new FormControl(data?.location, Validators.required),
      time: new FormControl(data?.time, Validators.required),
      additionalInfo: new FormControl(data?.additionalInfo),
      link: new FormControl(data?.link),
    });

  }

  cancel() {
    this.dialog.close();
  }

  update() {
    // Retrieve the date value from the form
  const selectedDate = new Date(this.meetUpForm.value.date);

  // Add one day to the selected date
  selectedDate.setDate(selectedDate.getDate() + 1);

  // Convert the adjusted date to ISO string
  const date = selectedDate.toISOString();

    const updatedBooking = {
      ...this.meetUpForm.value,
      date: date, // Append time to ensure consistent UTC representation
    };
    

    this.api.genericUpdate(`update-event/${this.data._id}`, updatedBooking).subscribe(
      (res) => {
        this.snackbar.open('Booking updated successfully', 'Close', { duration: 3000 });
        this.dialog.close(true); // Indicate success to parent component
      },
      (err) => {
        this.snackbar.open('Failed to update booking', 'Close', { duration: 3000 });
        console.error('Error updating booking:', err);
      }
    );
  }

}
