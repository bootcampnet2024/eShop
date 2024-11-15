using MediatR;
using Ordering.Domain.AggregatesModel.OrderAggregate;

namespace Ordering.Domain.Events;

public class OrderStatusChangedToAwaitingValidationDomainEvent(int orderId, IEnumerable<OrderItem> orderItems) : INotification
{
    public int OrderId { get; } = orderId;
    public IEnumerable<OrderItem> OrderItems { get; } = orderItems;
}