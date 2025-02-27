import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [CommonModule, FormsModule],
	template: `
    <div class="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 class="text-3xl font-bold text-center text-purple-600 mb-6">Login</h2>
      <form (ngSubmit)="login()">
        <div class="mb-4">
          <label class="block font-medium text-gray-700">Username:</label>
          <input type="text" [(ngModel)]="credentials.username" name="username" required class="w-full p-3 border rounded-lg focus:ring focus:ring-purple-300">
        </div>
        <div class="mb-4">
          <label class="block font-medium text-gray-700">Password:</label>
          <input type="password" [(ngModel)]="credentials.password" name="password" required class="w-full p-3 border rounded-lg focus:ring focus:ring-purple-300">
        </div>
        <button type="submit" class="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition">Login</button>
      </form>
    </div>
  `
})
export class LoginComponent {
	credentials = { username: '', password: '' };

	constructor(private http: HttpClient, private router: Router) { }

	login() {
		this.http.post('http://localhost:5000/api/login', this.credentials)
			.subscribe({
				next: (response: any) => {
					if (response.user) {
						Swal.fire({
							icon: 'success',
							title: 'Login Successful!',
							text: 'Redirecting...',
							timer: 2000,
							showConfirmButton: false
						}).then(() => {
							localStorage.setItem('token', response.user);
							this.router.navigate(['/dashboard']);
						});
					} else {
						Swal.fire({
							icon: 'error',
							title: 'Login Failed!',
							text: 'Invalid username or password.',
						});
					}
				},
				error: () => {
					Swal.fire({
						icon: 'error',
						title: 'Login Error!',
						text: 'Something went wrong. Please try again later.',
					});
				}
			});
	}
}
