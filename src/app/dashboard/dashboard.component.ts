import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from '../shared/topbar/topbar.component';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TopbarComponent, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: any;
  records: any[] = [];
  users: any[] = [];
  isLoading = true;
  editingUserId: string | null = null;
  editedName = '';
  editedRole = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
      this.loadRecords();

      if (this.user.role === 'Admin') {
        this.loadUsers();
      }
    } else {
      this.router.navigate(['/login']);
    }
  }

  private loadRecords() {
    this.userService.getUserRecords(this.user.role).subscribe({
      next: (data) => {
        this.records = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  private loadUsers() {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
      }
    });
  }

  onLogout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  startEdit(user: any) {
    this.editingUserId = user.id;
    this.editedName = user.username;
    this.editedRole = user.role;
  }

  saveEdit(user: any) {
    this.userService.editUser(user.id, {
      username: this.editedName,
      role: this.editedRole
    }).subscribe(() => {
      this.editingUserId = null;
      this.loadUsers();
    });
  }

  cancelEdit() {
    this.editingUserId = null;
    this.editedName = '';
    this.editedRole = '';
  }

  deleteUser(userId: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe(() => {
        this.loadUsers();
      });
    }
  }
}
