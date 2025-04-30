import { Component } from '@angular/core';
import { BookingListComponent } from "../booking-list/booking-list.component";
import { BookingFormComponent } from "../booking-form/booking-form.component";

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  imports: [BookingListComponent, BookingFormComponent],
})
export class CustomerDashboardComponent {}
