import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  role = 'customer';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    const userData = {
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role
    };

    this.authService.register(userData).subscribe(
      (response) => {
        alert('Registration successful! Please login.');
        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Registration error:', error);
        alert('Registration failed. Try again.');
      }
    );
  }
}
