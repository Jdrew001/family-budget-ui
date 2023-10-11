export interface UserModel {
    id: string;
    firstname: string;
    lastname: string;
    family?: {
        id: string;
        users: Array<UserModel>;
    }
}

export interface UserAccountModel {
    id: string;
    name: string;
}