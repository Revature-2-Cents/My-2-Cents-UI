export interface Incomes {
    Name: string;
    Amount: number;
    Transactions: [string, number, string, Date];
}

export interface Expenses {
    Name: string;
    Amount: number;
    ItemName: string;
    Price: number;
    Detail: string;
    showDate: Date;
}