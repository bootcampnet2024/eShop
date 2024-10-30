using Catalog.API._01_Services;
using MediatR;

namespace Catalog.API._00_Application.Operations.Queries.CategoryQueries.Handlers
{
    public class GetCountCategoriesQueryHandler(ICatalogCategoryService categoryService) : IRequestHandler<GetCountCategoriesQuery, int>
    {
        private readonly ICatalogCategoryService _catalogCategoryService = categoryService;
        public async Task<int> Handle(GetCountCategoriesQuery request, CancellationToken cancellationToken)
        {
            var count = await _catalogCategoryService.GetCount();
            return count;
        }
    }
}
