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

export interface Expenses {
    Name: string;
    Amount: number;
    ItemName: string;
    Price: number;
    Detail: string;
    showDate: string;
}

export const Mock_Items: Expenses[] = [
    {
    'Name': 'Account',
    'Amount': 100.00,
    'ItemName': 'TestItem',
    'Price': 10.00,
    'Detail': 'Purchased today',
    'showDate': '20220202'
    },{
    'Name': 'Account',
    'Amount': 100.00,
    'ItemName': 'TestItem2',
    'Price': -20.00,
    'Detail': 'Purchased Yesterday',
    'showDate': '20220202'
    }
];