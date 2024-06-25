using MediatR;
using Ordering.API.Application.Models.DTOs;
using Ordering.API.Application.Models;

namespace Ordering.API.Application.Requests;

public record CreateOrderDraftRequest(string BuyerId, IEnumerable<BasketItem> Items) : IRequest<OrderDraftDTO>;
