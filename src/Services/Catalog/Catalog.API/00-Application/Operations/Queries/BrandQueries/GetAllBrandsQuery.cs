using Catalog.API.Services.Models;
using MediatR;

namespace Catalog.API._00_Application.Operations.Queries.BrandQueries
{
    public record GetAllBrandsQuery : IRequest<IEnumerable<CatalogBrand>>;
}
