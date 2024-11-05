using MediatR;
using Ordering.Domain.AggregatesModel.OrderAggregate;
using Ordering.Domain.Exceptions;

namespace Ordering.API.Application.Commands;

public record ShipOrderCommand(int OrderId) : IRequest<bool>;

internal class ShipOrderCommandHandler(IOrderRepository orderRepository) : IRequestHandler<ShipOrderCommand, bool>
{
    private readonly IOrderRepository _orderRepository = orderRepository;

    public async Task<bool> Handle(ShipOrderCommand request, CancellationToken cancellationToken)
    {
        var order = await _orderRepository.GetAsync(request.OrderId);

        try
        {
            order.SetShippedStatus();
        }
        catch (OrderingDomainException)
        {
            return false;
        }
        
        _orderRepository.Update(order);

        return await _orderRepository.UnitOfWork.SaveEntitiesAsync(cancellationToken);
    }
}
