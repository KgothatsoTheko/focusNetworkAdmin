import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AddMentorComponent } from 'src/app/components/add-mentor/add-mentor.component';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/services/shared.service';
import { EditMentorComponent } from '../edit-mentor/edit-mentor.component';

@Component({
  selector: 'app-mentors',
  templateUrl: './mentors.component.html',
  styleUrls: ['./mentors.component.scss']
})
export class MentorsComponent {

  mentors!:any

  constructor(private dialog: MatDialog,private shared: SharedService, private api: ApiService, private router: Router, private snackbar: MatSnackBar){
    this.loadMentors()
  }

  private loadMentors(){
    this.api.genericGet('mentors').subscribe(
      (res:any) => {
        this.mentors = res
      },
      (error:any) => {
        console.log("something went wrong:", error); 
      }
    )
  }

  addMentor(){
    const ref = this.dialog.open(AddMentorComponent, {
      disableClose: true,
    })
    ref.afterClosed().subscribe(()=> {
      this.loadMentors()
    })
  }

  editMentor(item:any){
    const dialogRef = this.dialog.open(EditMentorComponent, {
      data: item,
      disableClose: true,
    });
  
    dialogRef.afterClosed().subscribe(() => {
        this.loadMentors();
    });
  }

  deleteMentor(item:any){
    this.api.genericDelete(`delete-mentor/${item._id}`).subscribe(
      (res:any) => {
        this.snackbar.open("Mentor Deleted", "Ok", {duration: 3000})
        this.loadMentors(); // Refresh bookings after deletion
      },
      (error:any) => {
        this.snackbar.open(`Error: ${error}`, 'Ok', { duration: 3000 });
        this.loadMentors(); // Refresh bookings after deletion
      }
    )

  }
}
