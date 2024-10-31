using MediatR;

namespace Catalog.API._00_Application.Operations.Queries.CategoryQueries.Handlers
{
    public record GetCountCategoriesQuery : IRequest<int>;
}
