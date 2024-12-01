import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-edit-bookings',
  templateUrl: './edit-bookings.component.html',
  styleUrls: ['./edit-bookings.component.scss']
})
export class EditBookingsComponent {

  bookingForm: FormGroup;

  constructor(
    private dialog: MatDialogRef<EditBookingsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, // Inject booking data
    private api: ApiService,
    private snackbar: MatSnackBar
  ) {

    // Convert UTC date to local date
    const localDate = new Date(data?.date).toISOString().slice(0, 10);

    // Initialize the form with the data
    this.bookingForm = new FormGroup({
      date: new FormControl(localDate, Validators.required),
      time: new FormControl(data?.time, Validators.required),
      status: new FormControl(data?.status, Validators.required),
      where: new FormControl(data?.where, Validators.required),
    });
  }

  cancel() {
    this.dialog.close();
  }

  update() {

    // Retrieve the date value from the form
  const selectedDate = new Date(this.bookingForm.value.date);

  // Add one day to the selected date
  selectedDate.setDate(selectedDate.getDate() + 1);

  // Convert the adjusted date to ISO string
  const date = selectedDate.toISOString();


    const updatedBooking = {
      ...this.bookingForm.value,
      date: date, // Convert back to UTC
    };

    this.api.genericUpdate(`update-booking/${this.data._id}`, updatedBooking).subscribe(
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
