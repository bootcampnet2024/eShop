using MediatR;
using Ordering.Domain.AggregatesModel.OrderAggregate;

namespace Ordering.Domain.Events;

public class OrderShippedDomainEvent(Order order) : INotification
{
    public Order Order { get; } = order;
}