namespace Ordering.API.Application.ViewModels;

public record OrderSummaryViewModel
{
    public string PictureUrl { get; init; }
    public int OrderId { get; init; }
    public string BuyerId { get; init; }
    public DateTime Date { get; init; }
    public string Status { get; init; }
    public double Total { get; init; }
}
