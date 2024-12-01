import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './dashboard-pages/home/home.component';
import { MentorsComponent } from './dashboard-pages/mentors/mentors.component';
import { MeetUpsComponent } from './dashboard-pages/meet-ups/meet-ups.component';
import { NuggetsComponent } from './dashboard-pages/nuggets/nuggets.component';
import { BookingsComponent } from './dashboard-pages/bookings/bookings.component';
import { GalleryComponent } from './dashboard-pages/gallery/gallery.component';
import { UsersComponent } from './dashboard-pages/users/users.component';
import { FeedbackComponent } from './dashboard-pages/feedback/feedback.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'page-not-found', component: PageNotFoundComponent},
  {path: 'dashboard', component: DashboardComponent, children: [
    {path: 'home', component:HomeComponent},
    {path: 'users', component:UsersComponent},
    {path: 'mentors', component:MentorsComponent},
    {path: 'meet-ups', component:MeetUpsComponent},
    {path: 'bookings', component:BookingsComponent},
    {path: 'nuggets', component:NuggetsComponent},
    {path: 'gallery', component:GalleryComponent},
    {path: 'feedback', component:FeedbackComponent},
  ]},
  {path: "**", component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
