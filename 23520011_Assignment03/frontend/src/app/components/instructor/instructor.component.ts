import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Department {
  dept_name: string;
  building?: string;
  budget?: number;
}

@Component({
  selector: 'app-instructor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h2 class="text-2xl font-bold mb-4">Instructor Form</h2>
      <form (ngSubmit)="submitForm()">
        <div class="mb-4">
          <label class="block font-semibold">ID:</label>
          <input type="number" [(ngModel)]="instructor.ID" name="ID" required class="w-full p-2 border rounded">
        </div>
        <div class="mb-4">
          <label class="block font-semibold">Name:</label>
          <input type="text" [(ngModel)]="instructor.name" name="name" required class="w-full p-2 border rounded">
        </div>
        <!-- Select for Department -->
        <div class="mb-4">
          <label class="block font-semibold">Department:</label>
          <select [(ngModel)]="instructor.dept_name" name="dept_name" required class="w-full p-2 border rounded">
            <option *ngFor="let dept of departments" [value]="dept.dept_name">{{ dept.dept_name }}</option>
          </select>
        </div>
        <div class="mb-4">
          <label class="block font-semibold">Salary:</label>
          <input type="number" [(ngModel)]="instructor.salary" name="salary" class="w-full p-2 border rounded">
        </div>
        <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded">Add Instructor</button>
      </form>
      <h2 class="text-2xl font-bold mt-6">Instructor List</h2>
      <ul class="mt-4">
        <li *ngFor="let i of instructors" class="border-b p-2">
          {{ i.ID }} - {{ i.name }} - {{ i.dept_name }} - {{ i.salary }}
        </li>
      </ul>
    </div>
  `,
})
export class InstructorComponent {
  instructor = { ID: null, name: '', dept_name: '', salary: null };
  instructors: any[] = [];
  departments: Department[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getInstructors();
    this.getDepartments();
  }

  getInstructors() {
    this.http.get<any[]>('http://localhost:5000/instructors')
      .subscribe(data => this.instructors = data);
  }

  getDepartments() {
    this.http.get<Department[]>('http://localhost:5000/departments')
      .subscribe(data => this.departments = data);
  }

  submitForm() {
    this.http.post('http://localhost:5000/instructors', this.instructor)
      .subscribe(response => {
        console.log('Instructor added:', response);
        this.getInstructors();
        this.instructor = { ID: null, name: '', dept_name: '', salary: null };
      });
  }
}
