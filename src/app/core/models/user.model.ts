export interface UserModel {
    id: string;
    firstname: string;
    lastname: string;
    email?: string;
    family?: {
        id: string;
        users: Array<UserModel>;
    },
    invitedUsers: Array<{id: string, email: string}>;
    displayValues?: Array<{id?: string, label: string, email: string, invitePending: boolean}>;
}

export interface UserAccountModel {
    id: string;
    name: string;
}