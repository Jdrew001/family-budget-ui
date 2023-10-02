export interface CurrentBudgetSummary {
    id: string;
    displayDate: string;
    leftSpendingAmount: string;
    leftSpendingDays: number;
    income: TypeAmount;
    expense: TypeAmount;
}

export interface TypeAmount {
    amount: string;
    icon: string;
}

export interface SummaryAccountBalance {
    id: string;
    name: string;
    icon: string;
    amount: string;
    active: boolean;
}

export interface SummaryTransactions {
    id: string;
    date: string;
    amount: string;
    description: string;
    category: string;
    categoryIcon: string;
    transactionType: number;
    showRed: boolean;
}