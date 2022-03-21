import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TrackIncomeComponent } from './track-income/track-income.component';
import { TransferMoneyComponent } from './transfer-money/transfer-money.component';
import { TrackExpensesComponent } from './track-expenses/track-expenses.component';
import { TrackMultipleAccountsComponent } from './track-multiple-accounts/track-multiple-accounts.component';

import { AuthModule } from '@auth0/auth0-angular';
import { environment as env } from '../environments/environment';
import { UserChangeInfoComponent } from './user-change-info/user-change-info.component';

import { CreateProfileComponent } from './create-profile/create-profile.component';
import { FormsModule } from '@angular/forms';
import { InvestmentPortfolioMainComponent } from './investment-portfolio/investment-portfolio-main/investment-portfolio-main.component';
import { InvestmentPortfolioTableComponent } from './investment-portfolio/investment-portfolio-table/investment-portfolio-table.component';
import { OrderHistoryComponent } from './investment-portfolio/order-history/order-history.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserProfileComponent,
    TrackIncomeComponent,
    TransferMoneyComponent,
    TrackExpensesComponent,
    TrackMultipleAccountsComponent,
    UserChangeInfoComponent,
    CreateProfileComponent,
    InvestmentPortfolioMainComponent,
    InvestmentPortfolioTableComponent,
    OrderHistoryComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AuthModule.forRoot({
      ...env.auth,
    }),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
