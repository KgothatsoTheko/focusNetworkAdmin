import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent {

  Feedback:any

  constructor(private api: ApiService, private snackbar: MatSnackBar){
    this.loadFeedback()
  }

  private loadFeedback(){
    this.api.genericGet('feedback').subscribe(
      (response:any)=> {
        this.Feedback = response
      },
      (error:any) => {
        console.log("something went wrong:", error);
      }
    )
  }

}
