import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-meet-ups',
  templateUrl: './add-meet-ups.component.html',
  styleUrls: ['./add-meet-ups.component.scss']
})
export class AddMeetUpsComponent {

  meetUpForm: FormGroup

  constructor(private dialog:MatDialogRef<AddMeetUpsComponent>, private location: Location, private api: ApiService, private router: Router, private snackbar: MatSnackBar) {
    this.meetUpForm = new FormGroup({
      title: new FormControl('', Validators.required),
      date: new FormControl('', [Validators.required]),
      location: new FormControl('', Validators.required),
      time: new FormControl('', Validators.required),
      additionalInfo: new FormControl(''),
    })
  }

  addMeet(){

    // Retrieve the date value from the form
  const selectedDate = new Date(this.meetUpForm.value.date);

  // Add one day to the selected date
  selectedDate.setDate(selectedDate.getDate() + 1);

  // Convert the adjusted date to ISO string
  const date = selectedDate.toISOString();


    const updatedMeetData = {
      ...this.meetUpForm.value,
      date: date, // Convert back to UTC
    };
    this.api.genericPost('add-events', updatedMeetData).subscribe(
      (res:any) => {
        this.snackbar.open("Added Meet Up", "Ok", {duration: 3000})
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
