namespace Ordering.API.Controllers.Core;

public class OrderingIdentityConstants
{
    public class Roles
    {
        public const string ADMIN = "admin";
        public const string MANAGE_USERS = "manage-users";
    }

    public const string USER_ID_CLAIM_NAME = "sub";
    public const string USER_NAME_CLAIM_NAME = "name";
}
