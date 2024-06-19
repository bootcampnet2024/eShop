using MediatR;

namespace Ordering.Domain.Events;

/// <summary>
/// Event used when the order stock items are confirmed
/// </summary>
public class OrderStatusChangedToStockConfirmedDomainEvent(int orderId) : INotification
{
    public int OrderId { get; } = orderId;
}