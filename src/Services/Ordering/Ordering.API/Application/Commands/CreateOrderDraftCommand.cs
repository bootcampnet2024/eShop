using MediatR;
using Ordering.API.Application.Models;
using Ordering.API.Application.Models.DTOs;

namespace Ordering.API.Application.Commands;

public record CreateOrderDraftCommand(string BuyerId, IEnumerable<BasketItem> Items) : IRequest<OrderDraftDTO>;