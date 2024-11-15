using Catalog.API._01_Services.DTOs;
using MediatR;

namespace Catalog.API._00_Application.Operations.Queries.CategoryQueries
{
    public record GetCategoryByIdQuery(int Id) : IRequest<CatalogCategoryDTO>;
}
