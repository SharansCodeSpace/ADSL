import { Component } from '@angular/core';
import { BookingListComponent } from "../booking-list/booking-list.component";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  imports: [BookingListComponent],
})
export class AdminDashboardComponent { }
