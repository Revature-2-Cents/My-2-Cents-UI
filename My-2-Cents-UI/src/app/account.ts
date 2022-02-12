import { CurrencyPipe, PercentPipe } from '@angular/common';

export interface Account {
  AccountID: number;
  // UserID: number;
  TotalBalance: CurrencyPipe;
  AccountType: string;
  Interest: PercentPipe;
}
