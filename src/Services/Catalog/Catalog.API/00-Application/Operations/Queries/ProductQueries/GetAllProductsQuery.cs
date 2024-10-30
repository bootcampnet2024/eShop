using Catalog.API._01_Services;
using Catalog.API._01_Services.Models;
using Catalog.API.Controllers.Filters;
using MediatR;

namespace Catalog.API._00_Application.Operations.Queries.ProductQueries
{
    public record GetAllProductsQuery(CatalogItemsFilter Filter) : IRequest<CatalogItemDataResult>;
}
