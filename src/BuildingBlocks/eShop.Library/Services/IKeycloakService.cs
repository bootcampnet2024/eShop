namespace eShop.Library.Services;

public interface IKeycloakService
{
    public string GetUserId();
    public string GetUserName();
    public IEnumerable<string> GetUserRoles();
    public string GetUserEmail();
}
