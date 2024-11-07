using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Ordering.Domain.AggregatesModel.BuyerAggregate;
using Ordering.Domain.AggregatesModel.OrderAggregate;
using Ordering.Infrastructure.Data;
using Ordering.Infrastructure.Repositories;

namespace Ordering.UnitTests.Repositories;

[TestClass()]
public class OrderRepositoryTests
{
    [TestMethod]
    public void Add_WhenTransient_ReturnsOrder()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(databaseName: $"TestDatabase_{Guid.NewGuid()}")
            .Options;
        using var dbContext = new ApplicationDbContext(options);
        var orderRepository = new OrderRepository(dbContext);

        var userId = Guid.NewGuid().ToString();
        var userName = "UserName";

        var buyer = new Buyer(userId, userName);
        var order = new Order(buyer.IdentityGuid, buyer.Name, new Address("Street 1", "City 1", "State 1", "12345", "Country 1"), 1, "1234", "123", "User One", DateTime.UtcNow.AddMonths(1), buyer.Id);

        // Act
        var result = orderRepository.Add(order);

        // Assert
        Assert.IsNotNull(result);
        Assert.AreEqual(order, result);
    }

    [TestMethod]
    public async Task Add_WhenNotTransient_ReturnsOrder()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(databaseName: $"TestDatabase_{Guid.NewGuid()}")
            .Options;
        using var dbContext = new ApplicationDbContext(options);

        var orderRepository = new OrderRepository(dbContext);
        var userId = Guid.NewGuid().ToString();
        var userName = "UserName";

        var buyer = new Buyer(userId, userName);
        buyer = dbContext.Buyers.Add(buyer).Entity;
        await orderRepository.UnitOfWork.SaveChangesAsync();

        var order = new Order(buyer.IdentityGuid, buyer.Name, new Address("Street 1", "City 1", "State 1", "Country 1", "12345"), 1, "1234", "123", "User One", DateTime.UtcNow.AddMonths(1), buyer.Id);
        dbContext.Orders.Add(order);
        await orderRepository.UnitOfWork.SaveChangesAsync();

        // Act
        var result = orderRepository.Add(order);

        // Assert
        Assert.IsNotNull(result);
        Assert.AreEqual(order, result);
    }

    [TestMethod]
    public async Task GetAsync_ReturnsOrder()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(databaseName: $"TestDatabase_{Guid.NewGuid()}")
            .Options;

        using var dbContext = new ApplicationDbContext(options);
        var orderRepository = new OrderRepository(dbContext);

        var userId = Guid.NewGuid().ToString();
        var userName = "UserName";
        var buyer = new Buyer(userId, userName);
        buyer = dbContext.Buyers.Add(buyer).Entity;
        await orderRepository.UnitOfWork.SaveChangesAsync();

        var order = new Order(buyer.IdentityGuid, buyer.Name, new Address("Street 1", "City 1", "State 1", "Country 1", "12345"), 1, "1234", "123", "User One", DateTime.UtcNow.AddMonths(1), buyer.Id);
        order = dbContext.Orders.Add(order).Entity;
        await orderRepository.UnitOfWork.SaveChangesAsync();

        // Act
        var result = await orderRepository.GetAsync(order.Id);

        // Assert
        Assert.IsNotNull(result);
        Assert.AreEqual(order, result);
    }

    [TestMethod]
    public async Task GetAsync_WhenOrderDoesNotExist_ReturnsNull()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(databaseName: $"TestDatabase_{Guid.NewGuid()}")
            .Options;
        using var dbContext = new ApplicationDbContext(options);
        var orderRepository = new OrderRepository(dbContext);

        // Act
        var result = await orderRepository.GetAsync(It.IsAny<int>());

        // Assert
        Assert.IsNull(result);
    }

    [TestMethod]
    public async Task GetByUserId_ReturnsUserOrders()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(databaseName: $"TestDatabase_{Guid.NewGuid()}")
            .Options;

        using var dbContext = new ApplicationDbContext(options);
        var orderRepository = new OrderRepository(dbContext);

        var userId = Guid.NewGuid().ToString();
        var userName = "UserName";

        var buyer = new Buyer(userId, userName);
        buyer = dbContext.Buyers.Add(buyer).Entity;
        await orderRepository.UnitOfWork.SaveChangesAsync();

        var orders = new List<Order>
        {
            new (buyer.IdentityGuid, buyer.Name, new Address("Street 1", "City 1", "State 1", "Country 1", "12345"), 1, "1234", "123", "User One", DateTime.UtcNow.AddMonths(1), buyer.Id),
            new (buyer.IdentityGuid, buyer.Name, new Address("Street 2", "City 2", "State 2", "Country 2", "67890"), 2, "5678", "456", "User Two", DateTime.UtcNow.AddMonths(2), buyer.Id),
            new (buyer.IdentityGuid, buyer.Name, new Address("Street 3", "City 3", "State 3", "Country 3", "12345"), 3, "9012", "789", "User Three", DateTime.UtcNow.AddMonths(3), buyer.Id)
        };

        dbContext.Orders.AddRange(orders);
        await orderRepository.UnitOfWork.SaveChangesAsync();

        // Act
        var result = await orderRepository.GetByUserIdAsync(userId);

        // Assert
        Assert.IsNotNull(result);
        Assert.AreEqual(3, result.Count());
    }

    [TestMethod]
    public async Task Update_WhenOrderExists_EntityStateShouldBeModified()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(databaseName: $"TestDatabase_{Guid.NewGuid()}")
            .Options;
        using var dbContext = new ApplicationDbContext(options);
        var orderRepository = new OrderRepository(dbContext);

        var userId = Guid.NewGuid().ToString();
        var userName = "UserName";

        var buyer = new Buyer(userId, userName);
        buyer = dbContext.Buyers.Add(buyer).Entity;
        await orderRepository.UnitOfWork.SaveChangesAsync();

        var order = new Order(buyer.IdentityGuid, buyer.Name, new Address("Street 1", "City 1", "State 1", "Country 1", "12345"), 1, "1234", "123", "User One", DateTime.UtcNow.AddMonths(1), buyer.Id);

        order = dbContext.Orders.Add(order).Entity;
        await orderRepository.UnitOfWork.SaveChangesAsync();

        // Act
        order.AddOrderItem(Guid.NewGuid().ToString(), "Product 1", 1, 0, "Picture Url");
        orderRepository.Update(order);

        // Assert
        Assert.AreEqual(dbContext.Orders.Entry(order).State, EntityState.Modified);
    }

    [TestMethod]
    public async Task Update_WhenOrderDoesNotExists_EntityStateMustNotBeModified()
    {
        // Arrange
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(databaseName: $"TestDatabase_{Guid.NewGuid()}")
            .Options;
        using var dbContext = new ApplicationDbContext(options);
        var orderRepository = new OrderRepository(dbContext);

        var userId = Guid.NewGuid().ToString();
        var userName = "UserName";

        var buyer = new Buyer(userId, userName);
        buyer = dbContext.Buyers.Add(buyer).Entity;
        await orderRepository.UnitOfWork.SaveChangesAsync();

        var order = new Order(buyer.IdentityGuid, buyer.Name, new Address("Street 1", "City 1", "State 1", "Country 1", "12345"), 1, "1234", "123", "User One", DateTime.UtcNow.AddMonths(1), buyer.Id);

        // Act
        orderRepository.Update(order);

        // Assert
        Assert.AreNotEqual(dbContext.Orders.Entry(order).State, EntityState.Modified);
    }
}
