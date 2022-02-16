export interface Account {
  accountID: number;
  totalBalance: number;
  accountType: string;
  interest: number;
}

export interface AccountTypes {
  accountTypeId: number;
  accountType1: string;
}

export interface NewAccount {
  userId: number;
  accountTypeId: number;
}