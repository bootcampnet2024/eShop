using MediatR;
using Ordering.API.Application.ViewModels;
using Ordering.Domain.AggregatesModel.OrderAggregate;

namespace Ordering.API.Application.Queries;

public record GetOrdersByUserIdQuery(string UserId) : IRequest<IEnumerable<OrderSummaryViewModel>>;

internal class GetOrdersByUserIdQueryHandler(IOrderRepository orderRepository) : IRequestHandler<GetOrdersByUserIdQuery, IEnumerable<OrderSummaryViewModel>>
{
    private readonly IOrderRepository _orderRepository = orderRepository;

    public async Task<IEnumerable<OrderSummaryViewModel>> Handle(GetOrdersByUserIdQuery request, CancellationToken cancellationToken)
    {
        var orders = await _orderRepository.GetByUserIdAsync(request.UserId);

        return orders
            .Select(o => new OrderSummaryViewModel
            {
                PictureUrl = o.OrderItems.FirstOrDefault()?.PictureUrl,
                OrderId = o.Id,
                BuyerId = o.Buyer.IdentityGuid,
                Date = o.OrderDate,
                Status = o.OrderStatus.ToString(),
                Total = (double)o.OrderItems.Sum(oi => oi.UnitPrice * oi.Units)
            });
    }
}
