import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-edit-mentor',
  templateUrl: './edit-mentor.component.html',
  styleUrls: ['./edit-mentor.component.scss']
})
export class EditMentorComponent {

  mentorForm: FormGroup;

  constructor(
    private dialog: MatDialogRef<EditMentorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, // Inject booking data
    private api: ApiService,
    private snackbar: MatSnackBar
  ) {

    // Convert UTC date to local date
    const localDate = new Date(data?.availability[0].date).toISOString().slice(0, 10);

    // Initialize the form with the data
    this.mentorForm = new FormGroup({
      profileImage: new FormControl(data?.profileImage, Validators.required),
      fullName: new FormControl(data?.fullName, Validators.required),
      bio: new FormControl(data?.bio, Validators.required),
      expertise: new FormControl(data?.expertise, Validators.required),
      availability: new FormGroup({
        date: new FormControl(localDate, Validators.required),
        time: new FormControl(data?.availability[0].time, Validators.required),
      }),
      contactInfo: new FormControl(data?.contactInfo),
    });

  }

  cancel() {
    this.dialog.close();
  }

  update() {
    // Retrieve the availability group from the form
  const availabilityGroup = this.mentorForm.get('availability')?.value;

  // Retrieve and adjust the date
  const selectedDate = new Date(availabilityGroup.date);
  selectedDate.setDate(selectedDate.getDate() + 1); // Adjust date by adding one day
  const adjustedDate = selectedDate.toISOString().slice(0,10);

  // Prepare the updated mentor data
  const updatedMentor = {
    ...this.mentorForm.value,
    availability: {
      date: adjustedDate, // Use the adjusted date
      time: availabilityGroup.time, // Use the original time
    },
  };
    

    this.api.genericUpdate(`update-mentors/${this.data._id}`, updatedMentor).subscribe(
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
