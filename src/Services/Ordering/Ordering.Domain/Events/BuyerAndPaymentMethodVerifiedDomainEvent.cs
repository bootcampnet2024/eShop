using MediatR;
using Ordering.Domain.AggregatesModel.BuyerAggregate;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ordering.Domain.Events
{
    public class BuyerAndPaymentMethodVerifiedDomainEvent(Buyer buyer, PaymentMethod payment, int orderId) : INotification
    {
        public Buyer Buyer { get; private set; } = buyer;
        public PaymentMethod Payment { get; private set; } = payment;
        public int OrderId { get; private set; } = orderId;
    }
}