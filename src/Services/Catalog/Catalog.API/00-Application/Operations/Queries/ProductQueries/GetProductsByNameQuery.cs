using Catalog.API.Services.Models;
using MediatR;

namespace Catalog.API._00_Application.Operations.Queries.ProductQueries
{
    public record GetProductsByNameQuery(string name) : IRequest<IEnumerable<CatalogItem>>;
}
