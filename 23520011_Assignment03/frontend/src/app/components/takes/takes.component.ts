import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-takes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="max-w-md mx-auto p-6 bg-zinc-600 text-white shadow rounded-lg">
      <h2 class="text-2xl font-bold mb-4">Takes Form</h2>
      <form (ngSubmit)="submitForm()">
        <!-- Select Student -->
        <div class="mb-4">
          <label class="block font-semibold">Student:</label>
          <select [(ngModel)]="takes.ID" name="ID" required class="w-full p-2 border rounded">
            <option  class="text-black" value="">Select Student</option>
            <option  class="text-black" *ngFor="let s of students" [value]="s.ID">{{ s.name }} (ID: {{ s.ID }})</option>
          </select>
        </div>
        <!-- Select Section -->
        <div class="mb-4">
          <label class="block font-semibold">Section:</label>
          <select [(ngModel)]="selectedSection" name="section" (change)="onSectionChange($event)" required class="w-full p-2 border rounded">
            <option  class="text-black" value="">Select Section</option>
            <option  class="text-black" *ngFor="let s of sections" [value]="s.course_id + ',' + s.sec_id + ',' + s.semester + ',' + s.year">
              {{ s.course_id }} - {{ s.sec_id }} - {{ s.semester }} {{ s.year }}
            </option>
          </select>
        </div>
        <!-- Grade input -->
        <div class="mb-4">
          <label class="block font-semibold">Grade:</label>
          <input type="text" [(ngModel)]="takes.grade" name="grade" class="w-full p-2 border rounded">
        </div>
        <button type="submit" class="bg-gray-300 text-black px-4 py-2 rounded">Add Takes Record</button>
      </form>
      <h2 class="text-2xl font-bold mt-6">Takes List</h2>
      <ul class="mt-4">
        <li *ngFor="let t of takesList" class="border-b p-2">
          Student: {{ t.ID }}, Section: {{ t.course_id }} - {{ t.sec_id }} - {{ t.semester }} {{ t.year }}, Grade: {{ t.grade }}
        </li>
      </ul>
    </div>
  `,
})
export class TakesComponent {
  takes = { ID: null, course_id: '', sec_id: '', semester: '', year: 0, grade: '' };
  takesList: any[] = [];
  students: any[] = [];
  sections: any[] = [];
  selectedSection: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getTakes();
    this.getStudents();
    this.getSections();
  }

  getTakes() {
    this.http.get<any[]>('http://localhost:5000/takes')
      .subscribe(data => this.takesList = data);
  }

  getStudents() {
    this.http.get<any[]>('http://localhost:5000/students')
      .subscribe(data => this.students = data);
  }

  getSections() {
    this.http.get<any[]>('http://localhost:5000/sections')
      .subscribe(data => this.sections = data);
  }

  onSectionChange(event: any) {
    const value = event.target.value;
    if (value) {
      const [course_id, sec_id, semester, year] = value.split(',');
      this.takes.course_id = course_id;
      this.takes.sec_id = sec_id;
      this.takes.semester = semester;
      this.takes.year = +year;
    }
  }

  submitForm() {
    this.http.post('http://localhost:5000/takes', this.takes)
      .subscribe(response => {
        console.log('Takes record added:', response);
        this.getTakes();
        this.takes = { ID: null, course_id: '', sec_id: '', semester: '', year: 0, grade: '' };
        this.selectedSection = '';
      });
  }
}
