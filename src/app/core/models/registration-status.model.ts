export interface RegistrationStatus {
    onboarded: boolean;
    userInvited: boolean;
    isPartial: boolean;
    requiredSections: string[];
}