using Catalog.API._01_Services;
using Catalog.API._01_Services.DTOs;
using MediatR;

namespace Catalog.API._00_Application.Operations.Queries.CategoryQueries.Handlers
{
    public class GetAllCategoriesHandlers(ICatalogCategoryService categoryService) : IRequestHandler<GetAllCategoriesQuery, CatalogDataDTO<CatalogCategoryDTO>>
    {
        private readonly ICatalogCategoryService _categoryService = categoryService;
        public async Task<CatalogDataDTO<CatalogCategoryDTO>> Handle(GetAllCategoriesQuery request, CancellationToken cancellationToken)
        {
            return await _categoryService.GetAll(request.Filter);
        }
    }
}
