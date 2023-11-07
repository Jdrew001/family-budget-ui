export interface CategoriesModel {
    id: string;
    name: string;
    type: number;
    icon: string;
}

export interface AccountModel {
    id: string;
    name: string;
    description: string;
    icon: string;
    accountType: string;
    createBudget: boolean;
    frequency: any;
    shouldDisable?: boolean;
}