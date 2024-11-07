using Ordering.Domain.AggregatesModel.OrderAggregate;

namespace Ordering.API.Application.ViewModels;

public record OrderViewModel
{
    public string PictureUrl { get; init; }
    public int OrderId { get; init; }
    public string BuyerId { get; init; }
    public DateTime Date { get; init; }
    public string Status { get; init; }
    public string Description { get; init; }
    public AddressViewModel Address { get; init; }
    public List<OrderItemViewModel> OrderItems { get; set; }
    public decimal Total { get; set; }

    public static OrderViewModel FromModel(Order order)
    {
        return new OrderViewModel()
        {
            PictureUrl = order.OrderItems.FirstOrDefault()?.PictureUrl,
            OrderId = order.Id,
            BuyerId = order.Buyer.IdentityGuid,
            Date = order.OrderDate,
            Status = order.OrderStatus.ToString(),
            Description = order.Description,
            Address = AddressViewModel.FromModel(order.Address),
            OrderItems = order.OrderItems.Select(oi => new OrderItemViewModel()
            {
                ProductId = oi.ProductId,
                PictureUrl = oi.PictureUrl,
                ProductName = oi.ProductName,
                Units = oi.Units,
                UnitPrice = oi.UnitPrice
            }).ToList(),
            Total = order.OrderItems.Sum(oi => oi.UnitPrice * oi.Units)
        };
    }
}
