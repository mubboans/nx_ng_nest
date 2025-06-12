import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  { path: 'login', loadComponent: () => import('../components/login/login.component').then(m => m.LoginComponent)},
  { path: 'otp', loadComponent: () => import('../components/verification/otp.component').then(m => m.OtpComponent) },
  { path: '', pathMatch: 'full', redirectTo: 'login', },
  { path: 'dashboard', loadComponent: () => import('../components/dashboard/dashboard.component').then(m => m.DashboardComponent) },
  {
    path: '**',
    loadComponent: () =>
      import('../components/not-found/not-found.component').then(m => m.NotFoundComponent), // 👈 Wildcard route
  },
];
