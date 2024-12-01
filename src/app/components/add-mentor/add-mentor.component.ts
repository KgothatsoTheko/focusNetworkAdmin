import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-mentor',
  templateUrl: './add-mentor.component.html',
  styleUrls: ['./add-mentor.component.scss']
})
export class AddMentorComponent {

  mentorForm: FormGroup

  constructor(private dialog:MatDialogRef<AddMentorComponent>, private location: Location, private api: ApiService, private router: Router, private snackbar: MatSnackBar) {
    this.mentorForm = new FormGroup({
      profileImage: new FormControl('', Validators.required),
      fullName: new FormControl('', Validators.required),
      bio: new FormControl('', Validators.required),
      expertise: new FormControl('', Validators.required),
      availability: new FormGroup({
        date: new FormControl('', Validators.required),
        time: new FormControl('', Validators.required),
      }),
      contactInfo: new FormControl('')
  })
  }

  add() {
  //     // Retrieve the date value from the form
  // const selectedDate = new Date(this.mentorForm.value.date);

  // // Add one day to the selected date
  // selectedDate.setDate(selectedDate.getDate() + 1);

  // // Convert the adjusted date to ISO string
  // const date = selectedDate.toISOString();


  //   const updatedMentor = {
  //     ...this.mentorForm.value,
  //     date: date, // Convert back to UTC
  //   };


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
    this.api.genericPost('add-mentors', updatedMentor).subscribe(
      (res:any) => {
        this.snackbar.open("New Mentor Added", "Ok", {duration: 3000})
        this.dialog.close(true)
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
