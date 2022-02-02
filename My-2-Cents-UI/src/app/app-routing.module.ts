import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

import { AuthGuard } from '@auth0/auth0-angular';
import { TrackMultipleAccountsComponent } from './track-multiple-accounts/track-multiple-accounts.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: TrackMultipleAccountsComponent,
    // canActivate: [AuthGuard], // need authentication to see the page
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
