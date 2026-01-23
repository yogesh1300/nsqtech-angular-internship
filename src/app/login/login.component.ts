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
  console.log('Login clicked', this.role);

  if (this.role === 'ADMIN') {
    this.router.navigate(['/admin']);
  } else if (this.role === 'USER') {
    this.router.navigate(['/user']);
  } else {
    alert('Select role');
  }
}
}
  
