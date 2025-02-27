import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-test-creation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="max-w-2xl mx-auto mt-10 p-6 bg-gradient-to-r from-cyan-600 to-purple-600 shadow-xl rounded-lg">
      <h2 class="text-3xl font-bold text-center text-white mb-6">Create Test</h2>
      <form (ngSubmit)="createTest()" class="bg-white p-6 rounded-lg shadow-md space-y-4">
        <div>
          <label class="block font-medium text-gray-700">Title:</label>
          <input type="text" [(ngModel)]="test.title" name="title" required class="w-full p-3 border rounded-lg focus:ring focus:ring-cyan-300">
        </div>
        <div>
          <label class="block font-medium text-gray-700">Description:</label>
          <textarea [(ngModel)]="test.description" name="description" class="w-full p-3 border rounded-lg focus:ring focus:ring-cyan-300"></textarea>
        </div>
        <div>
          <label class="block font-medium text-gray-700">Start Time:</label>
          <input type="datetime-local" [(ngModel)]="test.start_time" name="start_time" class="w-full p-3 border rounded-lg focus:ring focus:ring-cyan-300">
        </div>
        <div>
          <label class="block font-medium text-gray-700">Time Limit (minutes):</label>
          <input type="number" [(ngModel)]="test.time_limit" name="time_limit" required class="w-full p-3 border rounded-lg focus:ring focus:ring-cyan-300">
        </div>
        <button type="submit" class="w-full bg-cyan-600 text-white font-semibold py-3 rounded-lg hover:bg-cyan-700 transition">
          Create Test
        </button>
      </form>
      <h2 class="text-2xl font-bold mt-8 text-white">Created Tests</h2>
      <div class="mt-4 bg-white p-4 rounded-lg shadow-md overflow-auto" style="max-height: 300px;">
        <ul class="divide-y divide-gray-200">
          <li *ngFor="let t of tests" class="p-3 hover:bg-gray-100 transition">
            <strong>ID:</strong> {{ t.test_id }} - {{ t.title }} ({{ t.time_limit }} min)
          </li>
        </ul>
      </div>
    </div>
  `
})
export class TestCreationComponent {
  test = { title: '', description: '', start_time: '', time_limit: null };
  tests: any[] = [];

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.checkAuth();
    this.getTests();
  }

  checkAuth() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']); // Redirect to login if no token
    }
  }

  getTests() {
    this.http.get<any[]>('http://localhost:5000/api/tests')
      .subscribe(data => this.tests = data);
  }

  createTest() {
    // Convert the start_time to MySQL format (YYYY-MM-DD HH:MM:SS)
    const formattedStartTime = this.convertToMySQLFormat(this.test.start_time);

    // Set the formatted start time
    this.test.start_time = formattedStartTime;

    this.http.post('http://localhost:5000/api/tests', this.test)
      .subscribe(response => {
        console.log('Test created:', response);
        this.getTests();
        this.test = { title: '', description: '', start_time: '', time_limit: null };
      });
  }

  convertToMySQLFormat(dateTime: string): string {
    const [date, time] = dateTime.split('T');  // Split the date and time part
    return `${date} ${time}:00`;  // Add seconds to the time and return in MySQL format
  }
}
