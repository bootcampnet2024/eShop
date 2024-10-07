using MediatR;
using Microsoft.EntityFrameworkCore;
using Ordering.API.Application.ViewModels;
using Ordering.Infrastructure.Data;

namespace Ordering.API.Application.Queries;

public record GetCardTypesQuery : IRequest<IEnumerable<CardTypeViewModel>>;

internal class GetCardTypesQueryHandler(ApplicationDbContext dbContext) : IRequestHandler<GetCardTypesQuery, IEnumerable<CardTypeViewModel>>
{
    private readonly ApplicationDbContext _dbContext = dbContext;

    public async Task<IEnumerable<CardTypeViewModel>> Handle(GetCardTypesQuery request, CancellationToken cancellationToken)
    {
        var cardTypes = await _dbContext.CardTypes.ToListAsync(cancellationToken);

        return cardTypes.Select(CardTypeViewModel.FromCardType);
    }
}
