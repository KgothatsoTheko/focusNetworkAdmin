import { BreakpointObserver } from '@angular/cdk/layout';
import { Location } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper, StepperOrientation } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-add-mentor',
  templateUrl: './add-mentor.component.html',
  styleUrls: ['./add-mentor.component.scss']
})
export class AddMentorComponent {

  @ViewChild('stepper') stepper!: MatStepper

  fileName:any | string="No Image"
  upload:any
  fileChoosen:any
  mentorForm: FormGroup
  uploadForm: FormGroup
  stepperOrientation: Observable<StepperOrientation>;

  constructor(private shared: SharedService, breakpointObserver: BreakpointObserver, private dialog:MatDialogRef<AddMentorComponent>, private location: Location, private api: ApiService, private router: Router, private snackbar: MatSnackBar) {

    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));

    this.mentorForm = new FormGroup({
      fullName: new FormControl('', Validators.required),
      bio: new FormControl('', Validators.required),
      expertise: new FormControl('', Validators.required),
      availability: new FormGroup({
        date: new FormControl('', Validators.required),
        time: new FormControl('', Validators.required),
      }),
  })

    this.uploadForm = new FormGroup({
      file: new FormControl('')
  })
  }

  uploadFile(){
    this.upload = document.getElementById('upload') as HTMLInputElement;
    this.fileChoosen = document.getElementById('file-choosen');
    if (this.upload && this.fileChoosen) {
      this.upload.addEventListener('change', (event: Event) => {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
          this.fileChoosen.textContent = input.files[0].name;
          this.fileName = input.files[0].name
      
          const formData = new FormData();
          formData.append('file', input.files[0], input.files[0].name)
          const addedMentor = this.shared.get('newMentor', 'session')
          this.api.genericPost(`upload2/${addedMentor.fullName}`, formData).subscribe(
            (resposnse:any)=> {
              this.snackbar.open(`Success: ${resposnse}`, 'Ok', {duration: 3000})
              console.log("res", resposnse);
              this.dialog.close(true)
            },
            (error:any)=> {
              return this.snackbar.open(`Error: ${error}`, 'Ok', {duration: 3000})
            }
          )
        }
      }
    )}
  }

  add() {
  // Retrieve the date value from the form
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

    this.shared.set('newMentor', JSON.stringify(updatedMentor), 'session')
    this.api.genericPost('add-mentors', updatedMentor).subscribe(
      (res:any) => {
        this.snackbar.open("New Mentor Added", "Ok", {duration: 3000})
        this.stepper.next();
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
