import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('../components/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('../components/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'models',
    loadComponent: () =>
      import('../components/models/models.component').then((m) => m.ModelsComponent),
  },
  {
    path: 'test-drive',
    loadComponent: () =>
      import('../components/test-drive-flow/test-drive-flow.component').then(
        (m) => m.TestDriveFlowComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('../components/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'otp',
    loadComponent: () =>
      import('../components/verification/otp.component').then((m) => m.OtpComponent),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('../components/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('../components/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
  },
];