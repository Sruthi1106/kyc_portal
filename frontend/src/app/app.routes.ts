import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterKycComponent } from './pages/register-kyc/register-kyc.component';
import { LoginComponent } from './pages/login/login.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { KycDetailsComponent } from './pages/kyc-details/kyc-details.component';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register-kyc', component: RegisterKycComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: UserDashboardComponent, canActivate: [authGuard] },
  { path: 'admin/login', component: AdminLoginComponent },
  { path: 'admin', component: AdminDashboardComponent, canActivate: [adminGuard] },
  { path: 'admin/kyc/:id', component: KycDetailsComponent, canActivate: [adminGuard] },
  { path: '**', redirectTo: '' }
];
