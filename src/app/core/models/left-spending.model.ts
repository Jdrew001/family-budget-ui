import { TransactionType } from "./transaction-type.model";

export interface LeftSpendingManage {
    accountId?: string;
    accountName?: string;
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
    circleGuage?: any;
}