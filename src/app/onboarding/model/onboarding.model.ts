export interface OnboardingModel {
    profile: ProfileModel;
    accounts: AccountModel[];
    categories: CategoryModel[];
    familyInvites: FamilyInviteModel[];
    requiredSections: 'profile' | 'account' | 'category' | 'inviteFamily' ;
}

export interface ProfileModel {
    firstname: string;
    lastname: string;
    phone: string;
}

export interface AccountModel {
    name: string;
    description: string;
    beginningBalance: string;
    accountType: string;
    createBudget: boolean;
    frequency: number;
}

export interface CategoryModel {
    categoryName: string;
    categoryType: string;
    categoryIcon: string;
}

export interface FamilyInviteModel {
    email: string;
}

export enum OnBoardingStep {
    Profile = 'profile',
    Account = 'account',
    Category = 'category',
    InviteFamily = 'inviteFamily'
}

