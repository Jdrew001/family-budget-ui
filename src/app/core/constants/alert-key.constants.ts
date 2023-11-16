import { FamilySwitchConfirmationStrategy } from "../models/confirmation-stategies/family-switch-confirmation.strategy";


export class AlertKeyConstants {
    public static readonly FAMILY_SWITCH_CONFIRMATION = 'FAMILY_SWITCH_CONFIRMATION';
}

export const ActionStrategyMapping = {
    FAMILY_SWITCH_CONFIRMATION: FamilySwitchConfirmationStrategy
}