import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddInformationComponent } from 'src/app/components/add-information/add-information.component';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-nuggets',
  templateUrl: './nuggets.component.html',
  styleUrls: ['./nuggets.component.scss']
})
export class NuggetsComponent {

  information!:any

  constructor(private dialog: MatDialog, private api: ApiService){
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

}
