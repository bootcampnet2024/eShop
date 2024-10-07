using MediatR;
using Ordering.Domain.AggregatesModel.OrderAggregate;

namespace Ordering.API.Application.Commands;

public record CancelOrderCommand(int OrderId) : IRequest<bool>;

internal class CancelOrderCommandHandler(IOrderRepository orderRepository) : IRequestHandler<CancelOrderCommand, bool>
{
    private readonly IOrderRepository _orderRepository = orderRepository;

    public async Task<bool> Handle(CancelOrderCommand request, CancellationToken cancellationToken)
    {
        var order = await _orderRepository.GetAsync(request.OrderId);

        if (order is null)
            return false;

        order.SetCancelledStatus();
        _orderRepository.Update(order);

        return await _orderRepository.UnitOfWork.SaveEntitiesAsync(cancellationToken);
    }
}
