import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],   
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userId: string = '';
  password: string = '';
  role: string = 'General User';

  login() {
    alert(
      `User: ${this.userId}\nRole: ${this.role}`
    );
  }
}
