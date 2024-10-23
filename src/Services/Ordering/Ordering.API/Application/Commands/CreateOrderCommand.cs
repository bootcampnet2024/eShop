using MediatR;
using Ordering.API.Application.Models.DTOs;
using Ordering.API.Application.ViewModels;
using Ordering.Domain.AggregatesModel.BuyerAggregate;
using Ordering.Domain.AggregatesModel.OrderAggregate;

namespace Ordering.API.Application.Commands;

public record CreateOrderCommand(
    Address Address,
    string CardNumber,
    string CardHolderName,
    DateTime CardExpiration,
    int CardTypeId,
    string CardSecurityNumber,
    string UserName,
    string UserId,
    IEnumerable<OrderItemDTO> OrderItems
) : IRequest<OrderViewModel>;

internal class CreateOrderCommandHandler(IOrderRepository orderRepository, IBuyerRepository buyerRepository) : IRequestHandler<CreateOrderCommand, OrderViewModel>
{
    private readonly IOrderRepository _orderRepository = orderRepository;
    private readonly IBuyerRepository _buyerRepository = buyerRepository;

    public async Task<OrderViewModel> Handle(CreateOrderCommand request, CancellationToken cancellationToken)
    {
        var buyer = await AddOrUpdateBuyer(request);

        var order = new Order(request.UserId,
            request.UserName,
            request.Address,
            request.CardTypeId,
            request.CardNumber,
            request.CardSecurityNumber,
            request.CardHolderName,
            request.CardExpiration,
            buyer.Id
        );

        foreach (var item in request.OrderItems)
        {
            order.AddOrderItem(item.ProductId, item.ProductName, item.UnitPrice, item.Discount, item.PictureUrl, item.Units);
        }

        order = _orderRepository.Add(order);
        order.SetAwaitingValidationStatus();
        buyer.VerifyOrAddPaymentMethod(request.CardTypeId, $"Alias {request.CardNumber}", request.CardNumber, request.CardSecurityNumber, request.CardHolderName, request.CardExpiration, order.Id);

        await _orderRepository.UnitOfWork.SaveEntitiesAsync(cancellationToken);

        return OrderViewModel.FromModel(order);
    }

    private async Task<Buyer> AddOrUpdateBuyer(CreateOrderCommand request)
    {
        var buyer = await _buyerRepository.FindAsync(request.UserId);

        if (buyer == null)
        {
            buyer = new Buyer(request.UserId, request.UserName);
            _buyerRepository.Add(buyer);
        }

        await _buyerRepository.UnitOfWork.SaveEntitiesAsync();

        return buyer;
    }
}
