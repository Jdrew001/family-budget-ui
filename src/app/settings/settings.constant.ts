export class SettingsConstant {
    public static readonly FETCH_PROFILE_INFO = '/api/profile';
    public static readonly FETCH_ACCOUNTS = 'account/getUserAccounts';
    public static readonly FETCH_CATEGORIES = 'category/categoriesForUser';
    public static readonly CREATE_ACCOUNT = 'account/createAccounts';
    public static readonly UPDATE_ACCOUNT = 'account/updateAccount';
    public static readonly GET_ACCOUNT_BY_ID = 'account/getAccountById';
    public static readonly MARK_ACCOUNT_INACTIVE = 'account/markAccountInactive';
    public static readonly MANAGE_INVITE = 'family/manageInviteUser';
    public static readonly REMOVE_FAMILY_MEMBER = 'family/removeFamilyMember';
    public static readonly GET_FAMILY_MEMBERS = 'family/getFamilyMembers';
    public static readonly LEAVE_FAMILY = 'family/leaveFamily';
    public static readonly CREATE_CATEGORY = 'category/createCategory';
}


/**
 * when a user is removed from a family, we need to mark the user's account as inactive
 * 
 * When they go to login, we will ask them if they want to subscribe and create a new family.
 * 
 * If for whatever reason they want to rejoin the family, they will need to be invited.
 * And if they are invited, we will need to remove the old family and add them to the new one. ( we need to let them know this is going to happen)
 * 
 * If a user owns a family, they can be invited however if they are added to new family, they will need to be prompted that if they accept.. 
 * The old family will be inactive.
 * 
 * All of their data will be archived and can be restored if they decide to rejoin the family.
 */