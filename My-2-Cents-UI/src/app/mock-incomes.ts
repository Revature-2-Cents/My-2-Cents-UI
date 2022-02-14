// Use Incomes to match the database's JSON
export interface Incomes {
    accountId: number;
    accountType: string;
    amount: number;
    authorized: string;
    lineAmount: number;
    totalBalance: number;
    transactionDate: string;
    transactionId: number;
    transactionName: string;
}