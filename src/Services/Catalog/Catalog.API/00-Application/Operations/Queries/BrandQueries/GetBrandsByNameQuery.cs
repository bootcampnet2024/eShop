using Catalog.API._01_Services.Models;
using MediatR;

namespace Catalog.API._00_Application.Operations.Queries.BrandQueries
{
    public record GetBrandsByNameQuery(string name) : IRequest<IEnumerable<CatalogBrand>>;
}
