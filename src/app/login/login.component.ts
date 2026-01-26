import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  username = '';
  password = '';
  role = '';
  errorMessage = '';
  isLoading = false;

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  onLogin() {
    // Basic validation
    if (!this.username.trim() || !this.password.trim() || !this.role) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.userService.login(this.username, this.password, this.role).subscribe({
      next: (user) => {
        this.isLoading = false;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = 'Invalid credentials. Please check your username, password, and role.';
        }
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = 'Login failed. Please try again.';
      }
    });
  }
}
