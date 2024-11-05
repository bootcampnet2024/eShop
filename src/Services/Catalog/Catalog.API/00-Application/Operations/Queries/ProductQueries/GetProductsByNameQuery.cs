using Catalog.API._01_Services.DTOs;
using Catalog.API.Controllers.Filters;
using MediatR;

namespace Catalog.API._00_Application.Operations.Queries.ProductQueries
{
    public record GetProductsByNameQuery(string Name, CatalogItemsFilter Filter) : IRequest<CatalogDataDTO<CatalogItemDTO>>;
}
