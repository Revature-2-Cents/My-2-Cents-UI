import { CurrencyPipe, DecimalPipe, PercentPipe } from "@angular/common";

export interface Account {
  AccountID: number;
  UserID: number;
  TotalBalance: CurrencyPipe;
  AccountTypeID: number;
  Interest: PercentPipe;
}

