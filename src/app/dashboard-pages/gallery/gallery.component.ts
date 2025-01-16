import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddGalleryComponent } from 'src/app/components/add-gallery/add-gallery.component';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent {

  gallery!:any

  constructor(private dialog: MatDialog, private api: ApiService, private snackbar: MatSnackBar){
    this.loadGallery()
  }

  private loadGallery(){
    this.api.genericGet('gallery').subscribe(
      (res:any) => {
        this.gallery = res
      },
      (error:any) => {
        console.log("something went wrong:", error); 
      }
    )
  }

  addInfo(){
    const dialogRef = this.dialog.open(AddGalleryComponent, {
      disableClose: true,
    });
  
    dialogRef.afterClosed().subscribe(() => {
        // Refresh the booking list or update locally
        this.loadGallery();
    });
  }

  deleteImage(item:any){
    this.api.genericDelete(`delete-image/${item._id}`).subscribe(
      (res:any) => {
        this.snackbar.open("Image Deleted", "Ok", {duration: 3000})
        this.loadGallery(); // Refresh bookings after deletion
      },
      (error:any) => {
        this.snackbar.open(`Error: ${error}`, 'Ok', { duration: 3000 });
        this.loadGallery(); // Refresh bookings after deletion
      }
    )

  }

}
