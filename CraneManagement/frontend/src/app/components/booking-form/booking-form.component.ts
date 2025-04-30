import { Component } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  imports: [CommonModule, FormsModule],
  standalone: true,
})
export class BookingFormComponent {
  craneType: string = 'mobile';
  fromDate: string = '';
  toDate: string = '';

  constructor(private bookingService: BookingService) {}

  createBooking() {
    const userId = Number(localStorage.getItem('userId'));
    const bookingData = {
      user_id: userId,
      crane_type: this.craneType,
      from_date: this.fromDate,
      to_date: this.toDate,
    };

    this.bookingService.createBooking(bookingData).subscribe(
      (response) => {
        alert('Booking created successfully!');
      },
      (error) => {
        console.error('Error creating booking:', error);
      }
    );
  }
}
