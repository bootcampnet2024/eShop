using Catalog.API._01_Services;
using Catalog.API._01_Services.DTOs;
using MediatR;

namespace Catalog.API._00_Application.Operations.Queries.CategoryQueries.Handlers
{
    public class GetCategoriesByNameQueryHandler(ICatalogCategoryService categoryService) : IRequestHandler<GetCategoriesByNameQuery, CatalogDataDTO<CatalogCategoryDTO>>
    {
        private readonly ICatalogCategoryService _categoryService = categoryService;
        public async Task<CatalogDataDTO<CatalogCategoryDTO>> Handle(GetCategoriesByNameQuery request, CancellationToken cancellationToken)
        {
            return await _categoryService.GetByName(request.Name, request.Filter);
        }
    }
}
