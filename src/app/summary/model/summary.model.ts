export interface CurrentBudgetSummary {
    id: string;
    displayDate: string;
    leftSpendingAmount: string;
    leftSpendingDays: number;
    income: TypeAmount;
    expense: TypeAmount;
    showBudgetError: boolean;
    circleGuage: any;
}

export interface TypeAmount {
    amount: string;
    icon: string;
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
    circleGuage?: any;
}