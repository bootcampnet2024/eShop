using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Ordering.Domain.AggregatesModel.BuyerAggregate;
using Ordering.Infrastructure.Data;
using Ordering.Infrastructure.Repositories;

namespace Ordering.UnitTests.Repositories;

[TestClass()]
public class BuyerRepositoryTests
{
    [TestMethod]
    public async Task Add_WhenBuyerIsTransient_ShouldReturnBuyer()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(databaseName: $"TestDatabase_{Guid.NewGuid()}")
            .Options;

        using var dbContext = new ApplicationDbContext(options);

        var buyerRepository = new BuyerRepository(dbContext);

        var buyer = new Buyer(Guid.NewGuid().ToString(), "Test");

        // Act
        var result = buyerRepository.Add(buyer);
        await buyerRepository.UnitOfWork.SaveChangesAsync();

        // Assert
        Assert.IsNotNull(result);
        Assert.AreEqual(buyer.IdentityGuid, result.IdentityGuid);
        Assert.AreEqual(buyer.Name, result.Name);
    }

    [TestMethod]
    public async Task Add_WhenBuyerIsNotTransient_ShouldReturnBuyer()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(databaseName: $"TestDatabase_{Guid.NewGuid()}")
            .Options;

        using var dbContext = new ApplicationDbContext(options);
        var buyerRepository = new BuyerRepository(dbContext);

        var buyer = new Buyer(Guid.NewGuid().ToString(), "Test");
        dbContext.Buyers.Add(buyer);
        await buyerRepository.UnitOfWork.SaveChangesAsync();

        // Act
        var result = buyerRepository.Add(buyer);

        // Assert
        Assert.IsNotNull(result);
        Assert.AreEqual(buyer.IdentityGuid, result.IdentityGuid);
        Assert.AreEqual(buyer.Name, result.Name);
    }

    [TestMethod]
    public async Task FindAsync_WhenBuyerExists_ShouldReturnBuyer()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(databaseName: $"TestDatabase_{Guid.NewGuid()}")
            .Options;
        using var dbContext = new ApplicationDbContext(options);

        var buyerRepository = new BuyerRepository(dbContext);

        var buyer = new Buyer(Guid.NewGuid().ToString(), "Test");
        dbContext.Buyers.Add(buyer);
        await buyerRepository.UnitOfWork.SaveChangesAsync();

        // Act
        var result = await buyerRepository.FindAsync(buyer.IdentityGuid);

        // Assert
        Assert.IsNotNull(result);
        Assert.AreEqual(buyer.IdentityGuid, result.IdentityGuid);
        Assert.AreEqual(buyer.Name, result.Name);
    }

    [TestMethod]
    public async Task FindAsync_WhenBuyerDoesNotExist_ShouldReturnNull()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(databaseName: $"TestDatabase_{Guid.NewGuid()}")
            .Options;
        using var dbContext = new ApplicationDbContext(options);
        var buyerRepository = new BuyerRepository(dbContext);

        // Act
        var result = await buyerRepository.FindAsync(Guid.NewGuid().ToString());

        // Assert
        Assert.IsNull(result);
    }

    [TestMethod]
    public async Task FindByIdAsync_WhenBuyerExists_ShouldReturnBuyer()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(databaseName: $"TestDatabase_{Guid.NewGuid()}")
            .Options;
        using var dbContext = new ApplicationDbContext(options);

        var buyerRepository = new BuyerRepository(dbContext);

        var buyer = new Buyer(Guid.NewGuid().ToString(), "Test");
        dbContext.Buyers.Add(buyer);
        await buyerRepository.UnitOfWork.SaveChangesAsync();

        // Act
        var result = await buyerRepository.FindByIdAsync(buyer.Id);

        // Assert
        Assert.IsNotNull(result);
        Assert.AreEqual(buyer.IdentityGuid, result.IdentityGuid);
        Assert.AreEqual(buyer.Name, result.Name);
    }

    [TestMethod]
    public async Task FindByIdAsync_WhenBuyerDoesNotExist_ShouldReturnNull()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(databaseName: $"TestDatabase_{Guid.NewGuid()}")
            .Options;

        using var dbContext = new ApplicationDbContext(options);
        var buyerRepository = new BuyerRepository(dbContext);

        // Act
        var result = await buyerRepository.FindByIdAsync(It.IsAny<int>());

        // Assert
        Assert.IsNull(result);
    }

    [TestMethod]
    public async Task Update_WhenBuyerExists_ShouldReturnBuyer()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(databaseName: $"TestDatabase_{Guid.NewGuid()}")
            .Options;
        using var dbContext = new ApplicationDbContext(options);

        var buyerRepository = new BuyerRepository(dbContext);
        var buyer = new Buyer(Guid.NewGuid().ToString(), "Test");
        dbContext.Buyers.Add(buyer);
        await buyerRepository.UnitOfWork.SaveChangesAsync();

        buyer.VerifyOrAddPaymentMethod(1, "Alias", "Card Number", "1234-5678-1234-5678", "Test Holder", DateTime.Now.AddDays(10), 1);
        buyerRepository.Update(buyer);

        // Act
        var result = buyerRepository.Update(buyer);

        // Assert
        Assert.IsNotNull(result);
        Assert.AreEqual(buyer.IdentityGuid, result.IdentityGuid);
        Assert.AreEqual(buyer.Name, result.Name);
    }

    [TestMethod]
    public void Update_WhenBuyerDoesNotExist_ShouldReturnNull()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(databaseName: $"TestDatabase_{Guid.NewGuid()}")
            .Options;
        using var dbContext = new ApplicationDbContext(options);

        var buyer = new Buyer(Guid.NewGuid().ToString(), "Test");
        var buyerRepository = new BuyerRepository(dbContext);

        // Act
        var result = buyerRepository.Update(buyer);

        // Assert
        Assert.IsNull(result);
    }
}
