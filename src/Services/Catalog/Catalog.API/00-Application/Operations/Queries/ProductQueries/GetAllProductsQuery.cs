using Catalog.API._01_Services.Models;
using MediatR;

namespace Catalog.API._00_Application.Operations.Queries.ProductQueries
{
    public record GetAllProductsQuery : IRequest<IEnumerable<CatalogItem>>;
}
