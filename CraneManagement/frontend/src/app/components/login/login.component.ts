import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [FormsModule],
  standalone: true,
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.login({ email: this.email, password: this.password }).subscribe(
      (response) => {
        // Save user data in localStorage
        localStorage.setItem('userId', response.user.id.toString());
        localStorage.setItem('userRole', response.user.role);

        // Redirect based on role
        if (response.user.role === 'admin') {
          this.router.navigate(['/admin-dashboard']);
        } else {
          this.router.navigate(['/customer-dashboard']);
        }
      },
      (error) => {
        console.error('Login failed', error);
      }
    );
  }
}
