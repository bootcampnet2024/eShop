using Microsoft.EntityFrameworkCore;
using Ordering.Domain.AggregatesModel.OrderAggregate;
using Ordering.Domain.Kernel;
using Ordering.Infrastructure.Data;

namespace Ordering.Infrastructure.Repositories;

public class OrderRepository(ApplicationDbContext dbContext) : IOrderRepository
{
    private readonly DbSet<Order> _orders = dbContext.Orders;

    public IUnitOfWork UnitOfWork => dbContext;

    public Order Add(Order order)
    {
        if (order.IsTransient())
            return _orders.Add(order).Entity;

        return order;
    }

    public async Task<Order> GetAsync(int orderId)
    {
        var order = await _orders.FindAsync(orderId);

        if (order is null)
            return null;

        dbContext.Entry(order).Collection(i => i.OrderItems).Load();
        dbContext.Entry(order).Reference(b => b.Buyer).Load();

        return order;
    }

    public async Task<IEnumerable<Order>> GetByUserIdAsync(string userId)
    {
        var query = _orders
            .Include(o => o.OrderItems)
            .Where(o => o.Buyer.IdentityGuid == userId)
            .AsSplitQuery();

        return await query.ToListAsync();
    }

    public void Update(Order order)
    {
        if (order.IsTransient())
            return;

        _orders.Entry(order).State = EntityState.Modified;
    }
}
