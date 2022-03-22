import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TrackIncomeComponent } from './track-income/track-income.component';
import { TransferMoneyComponent } from './transfer-money/transfer-money.component';
import { TrackExpensesComponent } from './track-expenses/track-expenses.component';
import { TrackMultipleAccountsComponent } from './track-multiple-accounts/track-multiple-accounts.component';

import { environment as env } from '../environments/environment';
import { UserChangeInfoComponent } from './user-change-info/user-change-info.component';

import { CreateProfileComponent } from './create-profile/create-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { InvestmentPortfolioMainComponent } from './investment-portfolio/investment-portfolio-main/investment-portfolio-main.component';
import { InvestmentPortfolioTableComponent } from './investment-portfolio/investment-portfolio-table/investment-portfolio-table.component';
import { OrderHistoryComponent } from './investment-portfolio/order-history/order-history.component';

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
    RegisterComponent,
    InvestmentPortfolioMainComponent,
    InvestmentPortfolioTableComponent,
    OrderHistoryComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
