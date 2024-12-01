import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/services/shared.service';
import { AddAdminComponent } from '../add-admin/add-admin.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  currentUser!: any

  constructor(private dialog: MatDialog,private shared: SharedService, private api: ApiService, private router: Router) {
    this.currentUser = this.shared.get('currentUser', 'session')
  }

  logOut() {
    sessionStorage.clear()
    this.router.navigate(['/login'])
  }

  addAdmin(){
    this.dialog.open(AddAdminComponent, {
      disableClose: true,
    })
  }

}
