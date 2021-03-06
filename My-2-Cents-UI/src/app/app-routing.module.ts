import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TransferMoneyComponent } from './transfer-money/transfer-money.component';

import { AuthGuard } from '@auth0/auth0-angular';
import { TrackMultipleAccountsComponent } from './track-multiple-accounts/track-multiple-accounts.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserChangeInfoComponent } from './user-change-info/user-change-info.component';
import { TrackExpensesComponent } from './track-expenses/track-expenses.component';
import { TrackIncomeComponent } from './track-income/track-income.component';
import { CreateProfileComponent } from './create-profile/create-profile.component';

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
    canActivate: [AuthGuard], // need authentication to see the page
  },
  {
    path: 'track-income/:AccountID',
    component: TrackIncomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'create-profile',
    component: CreateProfileComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
