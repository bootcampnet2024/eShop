using MediatR;

namespace Catalog.API._00_Application.Operations.Queries.ProductQueries
{
    public record GetCountProductsQuery : IRequest<int>;
}
