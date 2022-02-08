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