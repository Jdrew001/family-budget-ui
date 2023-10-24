export interface MasterRefdata {
    accountTypes: Array<IdLabel>;
}

export interface IdLabel {
    id: string;
    label: string;
    value: string;
    type: string;
}