import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AddMeetUpsComponent } from 'src/app/components/add-meet-ups/add-meet-ups.component';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/services/shared.service';
import { EditMeetupsComponent } from '../edit-meetups/edit-meetups.component';

@Component({
  selector: 'app-meet-ups',
  templateUrl: './meet-ups.component.html',
  styleUrls: ['./meet-ups.component.scss']
})
export class MeetUpsComponent {

  events!:any

  constructor(private dialog: MatDialog,private shared: SharedService, private api: ApiService, private router: Router, private snackbar: MatSnackBar){
    this.loadEvents()
  }

  private loadEvents() {
    this.api.genericGet('events').subscribe(
      (res:any) => {
        this.events = res
      },
      (error:any) => {
        console.log("something went wrong:", error); 
      }
    )
  }

  addMeet(){
    const ref = this.dialog.open(AddMeetUpsComponent, {
      disableClose: true,
    })

    ref.afterClosed().subscribe(()=>{
      this.loadEvents()
    })
  }

  editMeetup(item:any){
    const dialogRef = this.dialog.open(EditMeetupsComponent, {
      data: item,
      disableClose: true,
    });
  
    dialogRef.afterClosed().subscribe(() => {
        this.loadEvents();
    });
  }

  deleteMeetup(item:any){
    this.api.genericDelete(`delete-events/${item._id}`).subscribe(
      (res:any) => {
        this.snackbar.open("Event Deleted", "Ok", {duration: 3000})
        this.loadEvents(); // Refresh bookings after deletion
      },
      (error:any) => {
        this.snackbar.open(`Error: ${error}`, 'Ok', { duration: 3000 });
        this.loadEvents(); // Refresh bookings after deletion
      }
    )

  }

}
