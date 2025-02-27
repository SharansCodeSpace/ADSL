import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-test-administration',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <div class="max-w-2xl mx-auto mt-10 p-6 bg-gradient-to-r from-purple-600 to-cyan-600 shadow-xl rounded-lg">
      <h2 class="text-3xl font-bold text-center text-white mb-6">Take Test</h2>
      <div class="bg-white p-6 rounded-lg shadow-md mb-6">
        <label class="block font-medium text-gray-700 mb-2">Enter Test ID:</label>
        <input type="number" [(ngModel)]="testId" class="w-full p-3 border rounded-lg focus:ring focus:ring-purple-300">
        <button (click)="loadTest()" class="mt-4 w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition">
          Load Test
        </button>
      </div>
      <div *ngIf="currentTest">
        <h3 class="text-2xl font-bold mb-4 text-gray-800">Test: {{ currentTest.title }}</h3>
        <form (ngSubmit)="submitTest()" class="space-y-6">
          <div *ngFor="let question of currentTest.questions; let i = index" class="p-4 bg-gray-100 rounded-lg">
            <p class="font-semibold">{{ i + 1 }}. {{ question.question_text }}</p>
            <img *ngIf="question.image_url" [src]="question.image_url" alt="Question Image" class="my-2 max-h-60">
            <p *ngIf="question.math_expr" class="italic">Math: {{ question.math_expr }}</p>
            <div class="mt-2 space-y-2" *ngFor="let opt of question.options">
              <label class="flex items-center space-x-2">
                <input type="radio" name="q{{question.question_id}}" [value]="opt.option_id" [(ngModel)]="answers[question.question_id]" required>
                <span>{{ opt.option_text }}</span>
              </label>
            </div>
          </div>
          <button type="submit" class="w-full bg-cyan-600 text-white py-3 rounded-lg hover:bg-cyan-700 transition">
            Submit Test
          </button>
        </form>
      </div>
    </div>
  `
})
export class TestAdministrationComponent {
    testId: number = 0;
    currentTest: any = null;
    answers: { [key: number]: number } = {};

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

    loadTest() {
        // Endpoint should return test details including questions and options.
        this.http.get<any>(`http://localhost:5000/api/tests/${this.testId}`)
            .subscribe(test => {
                this.currentTest = test;
            }, err => {
                alert('Test not found');
            });
    }

    submitTest() {
        const payload = {
            test_id: this.testId,
            student_id: 1, // For demo purposes; in a real app, use authenticated student id.
            answers: Object.keys(this.answers).map(qId => ({
                question_id: +qId,
                selected_option: this.answers[Number(qId)]
            }))
        };
        this.http.post('http://localhost:5000/api/test-submissions', payload)
            .subscribe(response => {
                alert('Test submitted successfully!');
                this.currentTest = null;
                this.testId = 0;
                this.answers = {};
            }, err => {
                alert('Error submitting test');
            });
    }
}
