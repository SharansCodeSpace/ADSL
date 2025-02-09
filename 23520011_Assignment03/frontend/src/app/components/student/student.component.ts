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
  selector: 'app-student',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h2 class="text-2xl font-bold mb-4">Student Form</h2>
      <form (ngSubmit)="submitForm()">
        <div class="mb-4">
          <label class="block font-semibold">ID:</label>
          <input type="number" [(ngModel)]="student.ID" name="ID" required class="w-full p-2 border rounded">
        </div>
        <div class="mb-4">
          <label class="block font-semibold">Name:</label>
          <input type="text" [(ngModel)]="student.name" name="name" required class="w-full p-2 border rounded">
        </div>
        <!-- Use a select for dept_name -->
        <div class="mb-4">
          <label class="block font-semibold">Department:</label>
          <select [(ngModel)]="student.dept_name" name="dept_name" required class="w-full p-2 border rounded">
            <option *ngFor="let dept of departments" [value]="dept.dept_name">{{ dept.dept_name }}</option>
          </select>
        </div>
        <div class="mb-4">
          <label class="block font-semibold">Total Credits:</label>
          <input type="number" [(ngModel)]="student.tot_cred" name="tot_cred" class="w-full p-2 border rounded">
        </div>
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Add Student</button>
      </form>
      <h2 class="text-2xl font-bold mt-6">Student List</h2>
      <ul class="mt-4">
        <li *ngFor="let s of students" class="border-b p-2">
          {{ s.ID }} - {{ s.name }} - {{ s.dept_name }} - {{ s.tot_cred }}
        </li>
      </ul>
    </div>
  `,
})
export class StudentComponent {
  student = { ID: null, name: '', dept_name: '', tot_cred: null };
  students: any[] = [];
  departments: Department[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getStudents();
    this.getDepartments();
  }

  getStudents() {
    this.http.get<any[]>('http://localhost:5000/students')
      .subscribe(data => this.students = data);
  }

  getDepartments() {
    this.http.get<Department[]>('http://localhost:5000/departments')
      .subscribe(data => this.departments = data);
  }

  submitForm() {
    this.http.post('http://localhost:5000/students', this.student)
      .subscribe(response => {
        console.log('Student added:', response);
        this.getStudents();
        this.student = { ID: null, name: '', dept_name: '', tot_cred: null };
      });
  }
}
