export interface CategoriesModel {
    id: string;
    name: string;
    type: number;
    icon: string;
}

export interface AccountModel {
    data: {
        id: string;
        name: string;
        beginningBalance: string;
        description: string;
        icon: string;
        accountType: string;
        createBudget: boolean;
        frequency: any;
        startDate: string;
    },
    shouldDisable?: boolean;
}

export interface FamilyUserModel {
    id: string;
    email: string;
    label: string;
    invitePending: boolean;
    isOwner: boolean;
}

export enum CategoryType {
    Income = 0,
    Expense = 1
}