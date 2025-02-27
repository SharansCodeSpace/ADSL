import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'app-question-bank',
	standalone: true,
	imports: [CommonModule, FormsModule],
	template: `
    <div class="max-w-2xl mx-auto mt-10 p-6 bg-gradient-to-r from-purple-600 to-cyan-600 shadow-xl rounded-lg">
      <h2 class="text-3xl font-bold text-center text-white mb-6">Question Bank Entry</h2>
      <form (ngSubmit)="submitQuestion()" class="bg-white p-6 rounded-lg shadow-md space-y-4">
        <div>
          <label class="block font-medium text-gray-700">Question Text:</label>
          <textarea [(ngModel)]="question.question_text" name="question_text" required class="w-full p-3 border rounded-lg focus:ring focus:ring-purple-300"></textarea>
        </div>
        <div>
          <label class="block font-medium text-gray-700">Image URL (optional):</label>
          <input type="text" [(ngModel)]="question.image_url" name="image_url" class="w-full p-3 border rounded-lg focus:ring focus:ring-purple-300">
        </div>
        <div>
          <label class="block font-medium text-gray-700">Math Expression (LaTeX):</label>
          <input type="text" [(ngModel)]="question.math_expr" name="math_expr" class="w-full p-3 border rounded-lg focus:ring focus:ring-purple-300">
        </div>
        <button type="submit" class="w-full bg-purple-600 text-white font-semibold py-3 rounded-lg hover:bg-purple-700 transition">
          Add Question
        </button>
      </form>
      <h2 class="text-2xl font-bold mt-8 text-white">Question List</h2>
      <div class="mt-4 bg-white p-4 rounded-lg shadow-md overflow-auto" style="max-height: 300px;">
        <ul class="divide-y divide-gray-200">
          <li *ngFor="let q of questions" class="p-3 hover:bg-gray-100 transition">
            <strong>ID:</strong> {{ q.question_id }} - {{ q.question_text }}
          </li>
        </ul>
      </div>
    </div>
  `
})
export class QuestionBankComponent {
	question = { question_text: '', image_url: '', math_expr: '' };
	questions: any[] = [];

	constructor(private http: HttpClient, private router: Router) { }

	ngOnInit() {
		this.checkAuth();
		this.getQuestions();
	}

	checkAuth() {
		const token = localStorage.getItem('token');
		if (!token) {
			this.router.navigate(['/login']); // Redirect to login if no token
		}
	}

	getQuestions() {
		this.http.get<any[]>('http://localhost:5000/api/questions')
			.subscribe(data => this.questions = data);
	}

	submitQuestion() {
		this.http.post('http://localhost:5000/api/questions', this.question)
			.subscribe(response => {
				console.log('Question added:', response);
				this.getQuestions();
				this.question = { question_text: '', image_url: '', math_expr: '' };
			});
	}
}
