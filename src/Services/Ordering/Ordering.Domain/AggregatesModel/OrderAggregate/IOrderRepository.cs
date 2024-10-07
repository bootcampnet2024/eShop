using Ordering.Domain.Kernel;

namespace Ordering.Domain.AggregatesModel.OrderAggregate
{
    public interface IOrderRepository : IRepository<Order>
    {
        Order Add(Order order);

        void Update(Order order);

        Task<IEnumerable<Order>> GetByUserIdAsync(string userId);

        Task<Order> GetAsync(int orderId);
    }
}
