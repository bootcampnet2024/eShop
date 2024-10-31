using Catalog.API._01_Services;
using Catalog.API._01_Services.Models;
using Catalog.API.Controllers.Filters;
using MediatR;

namespace Catalog.API._00_Application.Operations.Queries.CategoryQueries
{
    public record GetAllCategoriesQuery(GenericFilter Filter) : IRequest<CatalogCategoryDataResult>;
}
