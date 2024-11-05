using Catalog.API._01_Services.DTOs;
using Catalog.API.Controllers.Filters;
using MediatR;

namespace Catalog.API._00_Application.Operations.Queries.CategoryQueries
{
    public record GetAllCategoriesQuery(GenericFilter Filter) : IRequest<CatalogDataDTO<CatalogCategoryDTO>>;
}
