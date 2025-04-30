import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private apiUrl = 'http://localhost:5000/api/bookings';

  constructor(private http: HttpClient) { }

  createBooking(bookingData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, bookingData);
  }

  getAllBookings(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  getUserBookings(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }

  approveBooking(bookingId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/approve/${bookingId}`, {});
  }
}
