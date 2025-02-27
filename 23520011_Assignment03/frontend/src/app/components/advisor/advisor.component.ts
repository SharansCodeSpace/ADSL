import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-advisor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="max-w-md mx-auto p-6 bg-zinc-600 text-white shadow rounded-lg">
      <h2 class="text-2xl font-bold mb-4">Advisor Form</h2>
      <form (ngSubmit)="submitForm()">
        <div class="mb-4">
          <label class="block font-semibold">Student:</label>
          <select [(ngModel)]="advisor.s_ID" name="s_ID" required class="w-full p-2 border rounded">
            <option class="text-black" *ngFor="let s of students" [value]="s.ID">{{ s.name }} (ID: {{ s.ID }})</option>
          </select>
        </div>
        <div class="mb-4">
          <label class="block font-semibold">Instructor:</label>
          <select [(ngModel)]="advisor.i_ID" name="i_ID" required class="w-full p-2 border rounded">
            <option class="text-black" *ngFor="let i of instructors" [value]="i.ID">{{ i.name }} (ID: {{ i.ID }})</option>
          </select>
        </div>
        <button type="submit" class="bg-orange-300 text-black px-4 py-2 rounded">Add Advisor</button>
      </form>
      <h2 class="text-2xl font-bold mt-6">Advisor List</h2>
      <ul class="mt-4">
        <li *ngFor="let a of advisors" class="border-b p-2">
          Student ID: {{ a.s_ID }}, Instructor ID: {{ a.i_ID }}
        </li>
      </ul>
    </div>
  `,
})
export class AdvisorComponent {
  advisor = { s_ID: null, i_ID: null };
  advisors: any[] = [];
  students: any[] = [];
  instructors: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getAdvisors();
    this.getStudents();
    this.getInstructors();
  }

  getAdvisors() {
    this.http.get<any[]>('http://localhost:5000/advisors')
      .subscribe(data => this.advisors = data);
  }

  getStudents() {
    this.http.get<any[]>('http://localhost:5000/students')
      .subscribe(data => this.students = data);
  }

  getInstructors() {
    this.http.get<any[]>('http://localhost:5000/instructors')
      .subscribe(data => this.instructors = data);
  }

  submitForm() {
    this.http.post('http://localhost:5000/advisors', this.advisor)
      .subscribe(response => {
        console.log('Advisor added:', response);
        this.getAdvisors();
        this.advisor = { s_ID: null, i_ID: null };
      });
  }
}
