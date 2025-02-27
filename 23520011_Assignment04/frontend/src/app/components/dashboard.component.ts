import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 class="text-3xl font-bold text-center text-purple-600 mb-6">Dashboard</h2>
      <div *ngIf="dashboardData$ | async as dashboardData">
        <div class="mb-4 p-4 bg-gradient-to-r from-purple-200 to-cyan-200 rounded-lg">
          <p class="text-xl"><strong>Total Students:</strong> {{ dashboardData.totalStudents }}</p>
        </div>
        <div class="mb-4">
          <h3 class="text-2xl font-bold text-gray-700">Test Submissions by Status:</h3>
          <ul class="mt-2 space-y-2">
            <li *ngFor="let stat of dashboardData.testSubmissions" class="p-2 bg-gray-100 rounded">
              {{ stat.status }}: {{ stat.count }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  `
})

export class DashboardComponent {
    dashboardData$: Observable<any> = of({});

    constructor(private http: HttpClient, private router: Router) { }

    ngOnInit() {
        this.checkAuth();
        this.getDashboardData();
    }

    checkAuth() {
        const token = localStorage.getItem('token');
        if (!token) {
            this.router.navigate(['/login']); // Redirect to login if no token
        }
    }

    getDashboardData() {
        this.dashboardData$ = this.http.get<any>('http://localhost:5000/api/dashboard')
            .pipe(
                tap(data => console.log('Dashboard data', data)),
                catchError(err => {
                    console.error('Dashboard error', err);
                    return of({});
                })
            );
    }
}
