import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-classroom',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="max-w-xl mx-auto p-6 bg-zinc-600 text-white shadow rounded-lg">
      <h2 class="text-2xl font-bold mb-4">Classroom Form</h2>
      <form (ngSubmit)="submitForm()">
        <div class="mb-4">
          <label class="block font-semibold">Building:</label>
          <input type="text" [(ngModel)]="classroom.building" name="building" required class="w-full p-2 border rounded">
        </div>
        <div class="mb-4">
          <label class="block font-semibold">Room Number:</label>
          <input type="text" [(ngModel)]="classroom.room_number" name="room_number" required class="w-full p-2 border rounded">
        </div>
        <div class="mb-4">
          <label class="block font-semibold">Capacity:</label>
          <input type="number" [(ngModel)]="classroom.capacity" name="capacity" class="w-full p-2 border rounded">
        </div>
        <button type="submit" class="bg-teal-300 text-black px-4 py-2 rounded">Add Classroom</button>
      </form>
      <h2 class="text-2xl font-bold mt-6">Classroom List</h2>
      <ul class="mt-4">
        <li *ngFor="let c of classrooms" class="border-b p-2">
          {{ c.building }} - {{ c.room_number }} - {{ c.capacity }}
        </li>
      </ul>
    </div>
  `,
})
export class ClassroomComponent {
  classroom = { building: '', room_number: '', capacity: null };
  classrooms: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getClassrooms();
  }

  getClassrooms() {
    this.http.get<any[]>('http://localhost:5000/classrooms')
      .subscribe(data => this.classrooms = data);
  }

  submitForm() {
    this.http.post('http://localhost:5000/classrooms', this.classroom)
      .subscribe(response => {
        console.log('Classroom added:', response);
        this.getClassrooms();
        this.classroom = { building: '', room_number: '', capacity: null };
      });
  }
}
