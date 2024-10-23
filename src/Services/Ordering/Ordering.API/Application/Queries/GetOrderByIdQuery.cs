using MediatR;
using Ordering.API.Application.ViewModels;
using Ordering.Domain.AggregatesModel.OrderAggregate;

namespace Ordering.API.Application.Queries;

public record GetOrderByIdQuery(int OrderId) : IRequest<OrderViewModel>;

internal class GetOrderByIdQueryHandler(IOrderRepository orderRepository) : IRequestHandler<GetOrderByIdQuery, OrderViewModel>
{
    private readonly IOrderRepository _orderRepository = orderRepository;
    public async Task<OrderViewModel> Handle(GetOrderByIdQuery request, CancellationToken cancellationToken)
    {
        var order = await _orderRepository.GetAsync(request.OrderId);

        if (order is null)
            return null;

        return OrderViewModel.FromModel(order);
    }
}
