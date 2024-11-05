using Catalog.API._01_Services.DTOs;
using Catalog.API.Controllers.Filters;
using MediatR;

namespace Catalog.API._00_Application.Operations.Queries.BrandQueries
{
    public record GetBrandsByNameQuery(string Name, GenericFilter Filter) : IRequest<CatalogDataDTO<CatalogBrandDTO>>;
}
