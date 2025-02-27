import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-report',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <div class="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 class="text-3xl font-bold text-center text-purple-600 mb-6">Generic Report</h2>
      <form (ngSubmit)="getReport()" class="mb-6 space-y-4">
        <label class="block font-medium text-gray-700">Enter Table Name (e.g., users, questions, tests):</label>
        <input type="text" [(ngModel)]="tableName" name="tableName" required class="w-full p-3 border rounded-lg focus:ring focus:ring-purple-300">
        <button type="submit" class="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition">
          Get Report
        </button>
      </form>
      <div *ngIf="reportData">
        <h3 class="text-2xl font-bold mb-4 text-gray-800">Report: {{ tableName }}</h3>
        <pre class="bg-gray-100 p-4 rounded overflow-auto">{{ reportData | json }}</pre>
      </div>
    </div>
  `
})
export class ReportComponent {
    tableName: string = '';
    reportData: any;

    constructor(private http: HttpClient, private router: Router) { }

    ngOnInit() {
        this.checkAuth();
    }

    checkAuth() {
        const token = localStorage.getItem('token');
        if (!token) {
            this.router.navigate(['/login']); // Redirect to login if no token
        }
    }

    getReport() {
        this.http.get(`http://localhost:5000/api/reports/${this.tableName}`)
            .subscribe(data => {
                this.reportData = data;
            }, err => {
                alert('Error retrieving report');
            });
    }
}
