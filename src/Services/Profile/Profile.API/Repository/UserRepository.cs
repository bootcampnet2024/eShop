using Microsoft.EntityFrameworkCore;
using Profile.API.Infrastructure;
using Profile.API.Models;

public class UserRepository : IUserRepository
{
    private readonly ApplicationDataContext _context;

    public UserRepository(ApplicationDataContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<User>> GetAllUsersAsync()
    {
        return await _context.Users.ToListAsync();
    }

    public async Task<User> GetUserByIdAsync(Guid id)
    {
        return await _context.Users.FindAsync(id);
    }

    public async Task<User> AddUserAsync(User user)
    {
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        return user;
    }

    public async Task<User> UpdateUserAsync(User user)
    {
        var userExist = _context.Users.Find(user.Id);

        if (userExist != null)
        {
            // Proteger o e-mail e CPF de alterações
            user.Email = userExist.Email;
            user.CPF = userExist.CPF;

            _context.Entry(userExist).CurrentValues.SetValues(user);

            await _context.SaveChangesAsync();
        }
        return userExist;
    }

    public async Task<bool> DeleteUserAsync(Guid id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null)
        {
            return false;
        }

        _context.Users.Remove(user);
        await _context.SaveChangesAsync();
        return true;
    }
}
