using Microsoft.AspNetCore.Mvc;
using Profile.API.Models;

[Route("api/[controller]")]
[ApiController]
public class UsersController : ControllerBase
{
    private readonly IUserRepository _userRepository;

    public UsersController(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllUsers()
    {
        var users = await _userRepository.GetAllUsersAsync();
        return Ok(users);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetUserById(Guid id)
    {
        var user = await _userRepository.GetUserByIdAsync(id);
        if (user == null)
        {
            return NotFound();
        }
        return Ok(user);
    }

    [HttpPost]
    public async Task<IActionResult> AddUser([FromBody] User user)
    {
        if (user == null)
        {
            return BadRequest("User object is null");
        }

        var newUser = await _userRepository.AddUserAsync(user);
        return CreatedAtAction(nameof(GetUserById), new { id = newUser.Id }, newUser);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUser(Guid id, [FromBody] User user)
    {
        if (user == null)
        {
            return BadRequest("User object is null");
        }

        if (id != user.Id)
        {
            return BadRequest("ID mismatch");
        }

        var updatedUser = await _userRepository.UpdateUserAsync(user);
        return Ok(updatedUser);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(Guid id)
    {
        var success = await _userRepository.DeleteUserAsync(id);
        if (!success)
        {
            return NotFound();
        }

        return NoContent();
    }
}
