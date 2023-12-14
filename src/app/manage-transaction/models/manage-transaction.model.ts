import { TransactionType } from "src/app/core/models/transaction-type.model";

export interface ManageTransRefData {
    accounts: Array<{id: string, name: string}>;
    categories: Array<{id: string, name: string, type: TransactionType}>;
}

export interface ManageTransaction {
    id: string;
    account: string;
    description: string;
    category: string;
    amount: number;
    date: string;
}

export enum TransactionAction {
    Add,
    Edit
}