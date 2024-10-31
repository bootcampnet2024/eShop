namespace Ordering.API.Application.ViewModels;

public record OrderItemViewModel
{
    public string PictureUrl { get; init; }
    public string ProductId { get; init; }
    public string ProductName { get; init; }
    public int Units { get; init; }
    public decimal Discount { get; init; }
    public decimal UnitPrice { get; init; }
}