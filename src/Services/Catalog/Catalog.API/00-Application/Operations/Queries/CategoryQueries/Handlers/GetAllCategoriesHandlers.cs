using Catalog.API._01_Services;
using MediatR;

namespace Catalog.API._00_Application.Operations.Queries.CategoryQueries.Handlers
{
    public class GetAllCategoriesHandlers(ICatalogCategoryService categoryService) : IRequestHandler<GetAllCategoriesQuery, CatalogCategoryDataResult>
    {
        private readonly ICatalogCategoryService _categoryService = categoryService;
        public async Task<CatalogCategoryDataResult> Handle(GetAllCategoriesQuery request, CancellationToken cancellationToken)
        {
            return await _categoryService.GetAll(request.Filter);
        }
    }
}
