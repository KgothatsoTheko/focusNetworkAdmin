import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {

  users:any

  constructor(private api: ApiService, private snackbar: MatSnackBar){
    this.loadUsers()
  }

  private loadUsers(){
    this.api.genericGet('users').subscribe(
      (response:any)=> {
        this.users = response
      },
      (error:any) => {
        console.log("something went wrong:", error);
      }
    )
  }

  deleteUser(item:any){
    this.api.genericDelete(`deleteUser/${item.email}`).subscribe(
      (res:any) => {
        this.snackbar.open("User Deleted", "Ok", {duration: 3000})
        this.loadUsers(); // Refresh bookings after deletion
      },
      (error:any) => {
        this.snackbar.open(`Error: ${error.error}`, 'Ok', { duration: 3000 });
        this.loadUsers(); // Refresh bookings after deletion
      }
    )
  }

}
