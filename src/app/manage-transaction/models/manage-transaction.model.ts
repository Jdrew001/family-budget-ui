export interface ManageTransRefData {
    accounts: Array<{id: string, name: string}>;
    categories: Array<{id: string, name: string, type: TransactionType}>;
}

export enum TransactionType {
    Income,
    Expense
}

export enum TransactionAction {
    Add,
    Edit
}