import { OnBoardingStep } from "./model/onboarding.model";

export class OnboardingConstant {
    public static readonly ONBOARDING_URL = 'user/handleOnboarding';
    public static readonly ONBOARDING_PAGE_DATA = [
        {
            key: OnBoardingStep.Profile,
            title: 'Profile Information',
            description: 'Please fill in the information below to complete your profile.'
        },
        {
            key: OnBoardingStep.Account,
            title: 'Create Accounts',
            description: 'Please create your accounts below.'
        },
        {
            key: OnBoardingStep.Category,
            title: 'Choose your Categories',
            description: 'Please choose your categories below.'
        },
        {
            key: OnBoardingStep.InviteFamily,
            title: 'Invite Family',
            description: 'Ask family to join you on the app.'
        }
    ];
}