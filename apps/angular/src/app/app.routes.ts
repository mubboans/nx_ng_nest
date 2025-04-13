import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  { path: 'login', loadComponent: () => import('../components/login/login.component').then(m => m.LoginComponent)},
  { path: 'otp', loadComponent: () => import('../components/verification/otp.component').then(m => m.OtpComponent) }
];
