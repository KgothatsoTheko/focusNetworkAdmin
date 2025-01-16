import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddInformationComponent } from 'src/app/components/add-information/add-information.component';
import { ApiService } from 'src/app/services/api.service';
import { EditInformationComponent } from '../edit-information/edit-information.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-nuggets',
  templateUrl: './nuggets.component.html',
  styleUrls: ['./nuggets.component.scss']
})
export class NuggetsComponent {

  information!:any

  constructor(private dialog: MatDialog, private api: ApiService, private snackbar: MatSnackBar){
    this.loadInfo()
  }

  private loadInfo(){
    this.api.genericGet('information').subscribe(
      (res:any) => {
        this.information = res
      },
      (error:any) => {
        console.log("something went wrong:", error); 
      }
    )
  }

  addInfo(){
    const dialogRef = this.dialog.open(AddInformationComponent, {
      disableClose: true,
    });
  
    dialogRef.afterClosed().subscribe(() => {
        // Refresh the booking list or update locally
        this.loadInfo();
    });
  }

  editInformation(item:any){
    const dialogRef = this.dialog.open(EditInformationComponent, {
      data: item,
      disableClose: true,
    });
  
    dialogRef.afterClosed().subscribe(() => {
        this.loadInfo();
    });
  }

  deleteInformation(item:any){
    this.api.genericDelete(`delete-information/${item._id}`).subscribe(
      (res:any) => {
        this.snackbar.open("Information Deleted", "Ok", {duration: 3000})
        this.loadInfo(); // Refresh bookings after deletion
      },
      (error:any) => {
        this.snackbar.open(`Error: ${error}`, 'Ok', { duration: 3000 });
        this.loadInfo(); // Refresh bookings after deletion
      }
    )

  }

}
