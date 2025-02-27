import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="max-w-xl mx-auto p-6 bg-zinc-600 text-white shadow rounded-lg">
      <h2 class="text-2xl font-bold mb-4">Department Form</h2>
      <form (ngSubmit)="submitForm()">
        <div class="mb-4">
          <label class="block font-semibold">Department Name:</label>
          <input type="text" [(ngModel)]="department.dept_name" name="dept_name" required class="w-full p-2 border rounded">
        </div>
        <div class="mb-4">
          <label class="block font-semibold">Building:</label>
          <input type="text" [(ngModel)]="department.building" name="building" class="w-full p-2 border rounded">
        </div>
        <div class="mb-4">
          <label class="block font-semibold">Budget:</label>
          <input type="number" [(ngModel)]="department.budget" name="budget" step="0.01" class="w-full p-2 border rounded">
        </div>
        <button type="submit" class="bg-indigo-300 text-black px-4 py-2 rounded">Add Department</button>
      </form>
      <h2 class="text-2xl font-bold mt-6">Department List</h2>
      <ul class="mt-4">
        <li *ngFor="let d of departments" class="border-b p-2">
          {{ d.dept_name }} - {{ d.building }} - {{ d.budget }}
        </li>
      </ul>
    </div>
  `,
})
export class DepartmentComponent {
  department = { dept_name: '', building: '', budget: null };
  departments: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getDepartments();
  }

  getDepartments() {
    this.http.get<any[]>('http://localhost:5000/departments')
      .subscribe(data => this.departments = data);
  }

  submitForm() {
    this.http.post('http://localhost:5000/departments', this.department)
      .subscribe(response => {
        console.log('Department added:', response);
        this.getDepartments();
        this.department = { dept_name: '', building: '', budget: null };
      });
  }
}
