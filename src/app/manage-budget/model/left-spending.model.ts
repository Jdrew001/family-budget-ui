import { TransactionType } from "src/app/core/models/transaction-type.model";

export interface LeftSpendingManage {
    id: string;
    displayDate: string;
    leftSpendingAmount: string;
    leftSpendingDays: number;
    percentageSpent: number;
    totalSpent: string;
    totalBudget: string;
}

export interface CategoriesForBudget {
    id: string;
    name: string;
    budgetAmount: number;
    type: TransactionType;
    spentAmount: number;
    remainingAmount: number;
    showRed: boolean;
}