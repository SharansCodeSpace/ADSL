import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-prereq',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="max-w-md mx-auto p-6 bg-zinc-600 text-white shadow rounded-lg">
      <h2 class="text-2xl font-bold mb-4">Prerequisite Form</h2>
      <form (ngSubmit)="submitForm()">
        <div class="mb-4">
          <label class="block font-semibold">Course:</label>
          <select [(ngModel)]="prereq.course_id" name="course_id" required class="w-full p-2 border rounded">
            <option class="text-black" *ngFor="let c of courses" [value]="c.course_id">{{ c.course_id }} - {{ c.title }}</option>
          </select>
        </div>
        <div class="mb-4">
          <label class="block font-semibold">Prerequisite Course:</label>
          <select [(ngModel)]="prereq.prereq_id" name="prereq_id" required class="w-full p-2 border rounded">
            <option class="text-black" *ngFor="let c of courses" [value]="c.course_id">{{ c.course_id }} - {{ c.title }}</option>
          </select>
        </div>
        <button type="submit" class="bg-red-300 text-black px-4 py-2 rounded">Add Prerequisite</button>
      </form>
      <h2 class="text-2xl font-bold mt-6">Prerequisite List</h2>
      <ul class="mt-4">
        <li *ngFor="let p of prereqs" class="border-b p-2">
          {{ p.course_id }} - {{ p.prereq_id }}
        </li>
      </ul>
    </div>
  `,
})
export class PrereqComponent {
  prereq = { course_id: '', prereq_id: '' };
  prereqs: any[] = [];
  courses: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getPrereqs();
    this.getCourses();
  }

  getPrereqs() {
    this.http.get<any[]>('http://localhost:5000/prereqs')
      .subscribe(data => this.prereqs = data);
  }

  getCourses() {
    this.http.get<any[]>('http://localhost:5000/courses')
      .subscribe(data => this.courses = data);
  }

  submitForm() {
    this.http.post('http://localhost:5000/prereqs', this.prereq)
      .subscribe(response => {
        console.log('Prerequisite added:', response);
        this.getPrereqs();
        this.prereq = { course_id: '', prereq_id: '' };
      });
  }
}
