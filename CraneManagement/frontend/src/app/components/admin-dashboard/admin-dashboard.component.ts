import { Component } from '@angular/core';
import { BookingListComponent } from "../booking-list/booking-list.component";

@Component({
  selector: 'app-admin-dashboard',
  imports: [BookingListComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

}
