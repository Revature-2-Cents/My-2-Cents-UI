export interface Incomes {
    Name: string;
    Amount: number;
    Transactions: [string, number, string, Date];
}

export interface Expenses {
    Name: string;
    Amount: string;
    ItemName: string;
    Price: string;
    Detail: string;
    showDate: string;
}