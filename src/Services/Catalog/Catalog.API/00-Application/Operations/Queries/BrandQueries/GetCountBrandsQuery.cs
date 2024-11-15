using MediatR;

namespace Catalog.API._00_Application.Operations.Queries.BrandQueries
{
    public record GetCountBrandsQuery : IRequest<int>;
}
