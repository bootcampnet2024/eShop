using Moq;
using Profile.API.Models;
using Profile.API.Controller;
using System.Threading.Tasks;
using Xunit;
using Microsoft.AspNetCore.Mvc;
using Profile.API.DTOs;

namespace Profile.UnitTest.Controller
{
    public class UsersControllerTests
    {
        private readonly Mock<IUserRepository> _userRepositoryMock;
        private readonly UsersController _usersController;

        public UsersControllerTests()
        {
            _userRepositoryMock = new Mock<IUserRepository>();
            _usersController = new UsersController(_userRepositoryMock.Object);
        }

        [Fact]
        public async Task AddUser_ShouldReturnCreatedAtAction()
        {
            // Arrange
            var user = new User
            {
                Id = Guid.NewGuid(),
                Name = "Test User",
                Email = "test@example.com",
                CPF = "12345678901",
                Number = 123
            };

            _userRepositoryMock.Setup(repo => repo.AddUserAsync(It.IsAny<User>()))
                .ReturnsAsync(user);

            // Act
            var result = await _usersController.AddUser(user);

            // Assert
            var createdAtActionResult = Assert.IsType<CreatedAtActionResult>(result);
            Assert.Equal(nameof(UsersController.GetUserById), createdAtActionResult.ActionName);
            _userRepositoryMock.Verify(repo => repo.AddUserAsync(It.IsAny<User>()), Times.Once);
        }

        [Fact]
        public async Task UpdateUser_ShouldReturnOkResult()
        {
            // Arrange
            var userId = Guid.NewGuid();
            var existingUser = new User
            {
                Id = userId,
                Name = "Existing User",
                Email = "existing@example.com",
                CPF = "12345678901",
                Number = 456
            };

            var userUpdateDto = new UserUpdateDTO
            {
                Name = "Updated User",
                Number = 789
            };

            _userRepositoryMock.Setup(repo => repo.GetUserByIdAsync(userId)).ReturnsAsync(existingUser);
            _userRepositoryMock.Setup(repo => repo.UpdateUserAsync(It.IsAny<User>())).ReturnsAsync(existingUser);

            // Act
            var result = await _usersController.UpdateUser(userId, userUpdateDto);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var updatedUser = Assert.IsType<User>(okResult.Value);
            Assert.Equal(userUpdateDto.Name, updatedUser.Name);
            Assert.Equal(userUpdateDto.Number, updatedUser.Number);
            _userRepositoryMock.Verify(repo => repo.UpdateUserAsync(It.IsAny<User>()), Times.Once);
        }

        [Fact]
        public async Task GetUserById_ShouldReturnOkResult_WhenUserExists()
        {
            // Arrange
            var userId = Guid.NewGuid();
            var user = new User
            {
                Id = userId,
                Name = "Test User",
                Email = "test@example.com",
                CPF = "12345678901",
                Number = 123
            };

            _userRepositoryMock.Setup(repo => repo.GetUserByIdAsync(userId)).ReturnsAsync(user);

            // Act
            var result = await _usersController.GetUserById(userId);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var returnedUser = Assert.IsType<User>(okResult.Value);
            Assert.Equal(userId, returnedUser.Id);
            _userRepositoryMock.Verify(repo => repo.GetUserByIdAsync(userId), Times.Once);
        }
    }
}
