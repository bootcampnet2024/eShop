using Ordering.Domain.AggregatesModel.BuyerAggregate;

namespace Ordering.API.Application.ViewModels;

public record CardTypeViewModel
{
    public int Id { get; init; }
    public string Name { get; init; }

    public static CardTypeViewModel FromCardType(CardType cardType)
    {
        return new CardTypeViewModel
        {
            Id = cardType.Id,
            Name = cardType.Name
        };
    }
}
