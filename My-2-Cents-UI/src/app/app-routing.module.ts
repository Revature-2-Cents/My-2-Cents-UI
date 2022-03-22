import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TransferMoneyComponent } from './transfer-money/transfer-money.component';

import { TrackMultipleAccountsComponent } from './track-multiple-accounts/track-multiple-accounts.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserChangeInfoComponent } from './user-change-info/user-change-info.component';
import { TrackExpensesComponent } from './track-expenses/track-expenses.component';
import { TrackIncomeComponent } from './track-income/track-income.component';
import { CreateProfileComponent } from './create-profile/create-profile.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './_authGuards/auth.guard';
import { InvestmentPortfolioMainComponent } from './investment-portfolio/investment-portfolio-main/investment-portfolio-main.component';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: '/login',
  //   pathMatch: 'full',
  // },
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: TrackMultipleAccountsComponent, canActivate: [AuthGuard] },
  { path: 'track-income/:AccountID', component: TrackIncomeComponent, canActivate: [AuthGuard] },
  { path: 'create-profile', component: CreateProfileComponent, canActivate: [AuthGuard] },
  { path: 'investment-portfolio', component: InvestmentPortfolioMainComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
