export interface TransactionGroupRequest {
    page: number;
    size: number;
    accountId: string;
}

export interface TransactionGroupResponse {
    page: number;
    pageSize: number;
    transactions: Array<GroupTransaction>;
}

export interface GroupTransaction {
    groupName: string;
    transactions: Array<Transaction>;
}

export interface Transaction {
    id: string;
    description: string;
    date: string;
    showRed: boolean;
    amount: number;
    circleGuage?: any;
}