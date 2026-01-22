import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  userId = '';
  password = '';
  role = '';

  constructor(private router: Router) {}

  login() {
    if (!this.userId || !this.password || !this.role) {
      alert('Please fill all fields');
      return;
    }

    // Navigate to Admin or User dashboard
    if (this.role === 'ADMIN') {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/user']);
    }
  } // <-- this closes login()

} // <-- this closes LoginComponent
