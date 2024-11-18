using Ordering.API.Application.Models;

namespace Ordering.API.Application.Requests;

public record CreateOrderRequest(
    string City,
    string Street,
    string State,
    string Country,
    string ZipCode,
    string CardNumber,
    string CardHolderName,
    DateOnly CardExpiration,
    string CardSecurityNumber,
    int CardTypeId,
    List<BasketItem> Items
);
