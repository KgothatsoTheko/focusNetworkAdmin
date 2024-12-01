import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  users!:any
  mentors!:any
  meetUps: any = [];

  constructor(private dialog: MatDialog,private shared: SharedService, private api: ApiService, private router: Router){
    this.api.genericGet('users').subscribe(
      (response:any)=> {
        this.users = response
      },
      (error:any) => {
        console.log("something went wrong:", error);
      }
    )
    this.api.genericGet('mentors').subscribe(
      (response:any)=> {
        this.mentors = response
      },
      (error:any) => {
        console.log("something went wrong:", error);
      }
    )
    this.api.genericGet('events').subscribe(
      (response:any)=> {
        this.meetUps = response

        // Transform the meetUps data into the format required by FullCalendar
        const events = this.meetUps.map((eve:any)=> ({
          title: eve.title,
          date: eve.date.slice(0,10),
        }))

        // Update the calendarOptions.events property dynamically
        this.calendarOptions = {
          ...this.calendarOptions, // Preserve other calendar option
          events: events, //Update events dynamically
        }
      },
      (error:any) => {
        console.log("something went wrong:", error);
      }
    )
  }

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    weekends: true,
    events: [],

  }

  viewUsers(){
    this.router.navigate(['/dashboard/users'])
  }
}
