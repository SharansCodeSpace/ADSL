import { Component } from '@angular/core';
import { BookingListComponent } from "../booking-list/booking-list.component";
import { BookingFormComponent } from "../booking-form/booking-form.component";

@Component({
  selector: 'app-customer-dashboard',
  imports: [BookingListComponent, BookingFormComponent],
  templateUrl: './customer-dashboard.component.html',
  styleUrl: './customer-dashboard.component.css'
})
export class CustomerDashboardComponent {

}
