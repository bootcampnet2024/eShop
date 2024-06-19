using MediatR;
using Ordering.Domain.AggregatesModel.OrderAggregate;

namespace Ordering.Domain.Events;

public class OrderCancelledDomainEvent(Order order) : INotification
{
    public Order Order { get; } = order;
}