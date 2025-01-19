import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './dashboard-pages/home/home.component';
import { MentorsComponent } from './dashboard-pages/mentors/mentors.component';
import { MeetUpsComponent } from './dashboard-pages/meet-ups/meet-ups.component';
import { NuggetsComponent } from './dashboard-pages/nuggets/nuggets.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AddAdminComponent } from './components/add-admin/add-admin.component';
import { AddMentorComponent } from './components/add-mentor/add-mentor.component';
import { AddMeetUpsComponent } from './components/add-meet-ups/add-meet-ups.component';
import { AddInformationComponent } from './components/add-information/add-information.component';
import { BookingsComponent } from './dashboard-pages/bookings/bookings.component';
import { EditBookingsComponent } from './dashboard-pages/edit-bookings/edit-bookings.component';
import { EditMentorComponent } from './dashboard-pages/edit-mentor/edit-mentor.component';
import { AddGalleryComponent } from './components/add-gallery/add-gallery.component';
import { EditMeetupsComponent } from './dashboard-pages/edit-meetups/edit-meetups.component';
import { GalleryComponent } from './dashboard-pages/gallery/gallery.component';
import { UsersComponent } from './dashboard-pages/users/users.component';
import { FeedbackComponent } from './dashboard-pages/feedback/feedback.component';
import { EditInformationComponent } from './dashboard-pages/edit-information/edit-information.component';
import { SisterhoodRoomComponent } from './dashboard-pages/sisterhood-room/sisterhood-room.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    DashboardComponent,
    HomeComponent,
    MentorsComponent,
    MeetUpsComponent,
    NuggetsComponent,
    AddAdminComponent,
    AddMentorComponent,
    AddMeetUpsComponent,
    AddInformationComponent,
    BookingsComponent,
    EditBookingsComponent,
    EditMentorComponent,
    AddGalleryComponent,
    EditMeetupsComponent,
    GalleryComponent,
    UsersComponent,
    FeedbackComponent,
    EditInformationComponent,
    SisterhoodRoomComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    FullCalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
