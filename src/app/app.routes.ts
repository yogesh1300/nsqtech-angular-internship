import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'admin', component: AdminComponent },
      { path: 'user', component: UserComponent }
    ]
  },
  { path: '**', redirectTo: 'login' }
];
