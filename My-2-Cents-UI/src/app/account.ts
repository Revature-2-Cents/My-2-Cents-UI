import { CurrencyPipe, DecimalPipe, PercentPipe } from "@angular/common";

export interface Account {
  AccountID: number;
  TotalBalance: CurrencyPipe;
  AccountType: string;
  Interest: PercentPipe;
}
