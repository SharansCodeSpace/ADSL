import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Department {
  dept_name: string;
}

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h2 class="text-2xl font-bold mb-4">Course Form</h2>
      <form (ngSubmit)="submitForm()">
        <div class="mb-4">
          <label class="block font-semibold">Course ID:</label>
          <input type="text" [(ngModel)]="course.course_id" name="course_id" required class="w-full p-2 border rounded">
        </div>
        <div class="mb-4">
          <label class="block font-semibold">Title:</label>
          <input type="text" [(ngModel)]="course.title" name="title" class="w-full p-2 border rounded">
        </div>
        <!-- Select for Department -->
        <div class="mb-4">
          <label class="block font-semibold">Department:</label>
          <select [(ngModel)]="course.dept_name" name="dept_name" required class="w-full p-2 border rounded">
            <option *ngFor="let dept of departments" [value]="dept.dept_name">{{ dept.dept_name }}</option>
          </select>
        </div>
        <div class="mb-4">
          <label class="block font-semibold">Credits:</label>
          <input type="number" [(ngModel)]="course.credits" name="credits" class="w-full p-2 border rounded">
        </div>
        <button type="submit" class="bg-purple-500 text-white px-4 py-2 rounded">Add Course</button>
      </form>
      <h2 class="text-2xl font-bold mt-6">Course List</h2>
      <ul class="mt-4">
        <li *ngFor="let c of courses" class="border-b p-2">
          {{ c.course_id }} - {{ c.title }} - {{ c.dept_name }} - {{ c.credits }}
        </li>
      </ul>
    </div>
  `,
})
export class CourseComponent {
  course = { course_id: '', title: '', dept_name: '', credits: null };
  courses: any[] = [];
  departments: Department[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getCourses();
    this.getDepartments();
  }

  getCourses() {
    this.http.get<any[]>('http://localhost:5000/courses')
      .subscribe(data => this.courses = data);
  }

  getDepartments() {
    this.http.get<Department[]>('http://localhost:5000/departments')
      .subscribe(data => this.departments = data);
  }

  submitForm() {
    this.http.post('http://localhost:5000/courses', this.course)
      .subscribe(response => {
        console.log('Course added:', response);
        this.getCourses();
        this.course = { course_id: '', title: '', dept_name: '', credits: null };
      });
  }
}
