import { CurrencyPipe, PercentPipe } from '@angular/common';

export interface Account {
  accountID: number;
  // UserID: number;
  totalBalance: number;
  accountType: string;
  interest: number;
}
