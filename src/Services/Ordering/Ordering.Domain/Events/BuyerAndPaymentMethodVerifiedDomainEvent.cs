using MediatR;
using Ordering.Domain.AggregatesModel.BuyerAggregate;

namespace Ordering.Domain.Events
{
    public class BuyerAndPaymentMethodVerifiedDomainEvent(Buyer buyer, PaymentMethod payment, int orderId) : INotification
    {
        public Buyer Buyer { get; private set; } = buyer;
        public PaymentMethod Payment { get; private set; } = payment;
        public int OrderId { get; private set; } = orderId;
    }
}