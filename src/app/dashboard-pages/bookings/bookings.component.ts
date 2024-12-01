import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { EditBookingsComponent } from '../edit-bookings/edit-bookings.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent {

  bookings: any[] = [];
  mentors: Map<string, any> = new Map(); // Store mentors by ID
  users: Map<string, any> = new Map();   // Store users by ID

  constructor(private api: ApiService, private dialog: MatDialog, private snackbar: MatSnackBar) {
    this.loadBookings();
  }

  private loadBookings() {
    this.api.genericGet('bookings').subscribe(
      (res: any) => {
        this.bookings = res;

        // Track mentor and user IDs to avoid duplicate API calls
        const mentorIds = new Set<string>();
        const userIds = new Set<string>();

        this.bookings.forEach((booking) => {
          mentorIds.add(booking.mentorId);
          userIds.add(booking.userId);
        });

        // Fetch all mentors
        mentorIds.forEach((id) => {
          if (!this.mentors.has(id)) {
            this.api.genericGet(`mentors/${id}`).subscribe(
              (mentorRes) => this.mentors.set(id, mentorRes),
              (error) => console.error(`Error fetching mentor ${id}:`, error)
            );
          }
        });

        // Fetch all users
        userIds.forEach((id) => {
          if (!this.users.has(id)) {
            this.api.genericGet(`users/${id}`).subscribe(
              (userRes) => this.users.set(id, userRes),
              (error) => console.error(`Error fetching user ${id}:`, error)
            );
          }
        });
      },
      (error: any) => console.error("Error fetching bookings:", error)
    );
  }

  editBooking(booking:any){
    const dialogRef = this.dialog.open(EditBookingsComponent, {
      data: booking,
      disableClose: true,
    });
  
    dialogRef.afterClosed().subscribe(() => {
        this.loadBookings();
    });
  }

  deleteBooking(booking:any){
    this.api.genericDelete(`delete-booking/${booking._id}`).subscribe(
      (res:any) => {
        this.snackbar.open("Booking Deleted", "Ok", {duration: 3000})
        this.loadBookings(); // Refresh bookings after deletion
      },
      (error:any) => {
        this.snackbar.open(`Error: ${error.error}`, 'Ok', { duration: 3000 });
        this.loadBookings(); // Refresh bookings after deletion
      }
    )

  }
}
