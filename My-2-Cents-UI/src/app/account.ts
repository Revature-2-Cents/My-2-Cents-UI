import { CurrencyPipe, PercentPipe } from '@angular/common';

export interface Account {
  accountID: number;
  // UserID: number;
  totalBalance: CurrencyPipe;
  accountType: string;
  interest: PercentPipe;
}
