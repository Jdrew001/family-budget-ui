import { TransactionType } from "src/app/core/models/transaction-type.model";

export interface ManageTransRefData {
    accounts: Array<{id: string, name: string}>;
    categories: Array<{id: string, name: string, type: TransactionType}>;
}

export enum TransactionAction {
    Add,
    Edit
}