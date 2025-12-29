import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard';
import { Register } from './components/register/register';

export const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent }, 
  { path: 'register', component: Register },
  { path: 'learn', component: DashboardComponent }, 
];