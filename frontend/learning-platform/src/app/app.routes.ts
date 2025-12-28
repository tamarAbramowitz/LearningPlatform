import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard';

export const routes: Routes = [
  { path: '', redirectTo: 'learn', pathMatch: 'full' }, 
  { path: 'learn', component: DashboardComponent },
];