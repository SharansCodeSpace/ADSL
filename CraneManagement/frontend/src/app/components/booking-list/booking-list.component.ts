import { Component, Input, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css'],
  imports: [CommonModule, FormsModule],
  standalone: true,
})
export class BookingListComponent implements OnInit {
  @Input() isAdmin: boolean = false;
  bookings: any[] = [];

  constructor(private bookingService: BookingService) {}

  ngOnInit() {
    if (this.isAdmin) {
      this.bookingService.getAllBookings().subscribe((data) => {
        this.bookings = data;
      });
    } else {
      const userId = Number(localStorage.getItem('userId'));
      this.bookingService.getUserBookings(userId).subscribe((data) => {
        this.bookings = data;
      });
    }
  }

  approveBooking(id: number) {
    this.bookingService.approveBooking(id).subscribe(() => {
      alert('Booking approved!');
      this.ngOnInit();
    });
  }
}
