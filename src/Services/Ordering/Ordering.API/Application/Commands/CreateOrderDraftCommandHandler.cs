using MediatR;
using Ordering.API.Application.Extensions;
using Ordering.API.Application.Models.DTOs;
using Ordering.Domain.AggregatesModel.OrderAggregate;

namespace Ordering.API.Application.Commands;

public class CreateOrderDraftCommandHandler : IRequestHandler<CreateOrderDraftCommand, OrderDraftDTO>
{
    public Task<OrderDraftDTO> Handle(CreateOrderDraftCommand request, CancellationToken cancellationToken)
    {
        var order = Order.NewDraft();
        var items = request.Items.Select(i => i.ToOrderItemDTO());
        foreach (var item in items)
        {
            order.AddOrderItem(item.ProductId, item.ProductName, item.UnitPrice, item.Discount, item.PictureUrl, item.Units);
        }

        return Task.FromResult(OrderDraftDTO.FromOrder(order));
    }
}
