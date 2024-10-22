using Catalog.API._01_Services.Models;
using Catalog.API._01_Services;
using MediatR;

namespace Catalog.API._00_Application.Operations.Queries.CategoryQueries.Handlers
{
    public class GetCategoriesByNameQueryHandler(ICatalogCategoryService categoryService) : IRequestHandler<GetCategoriesByNameQuery, IEnumerable<CatalogCategory>>
    {
        private readonly ICatalogCategoryService _categoryService = categoryService;
        public async Task<IEnumerable<CatalogCategory>> Handle(GetCategoriesByNameQuery request, CancellationToken cancellationToken)
        {
            var categories = await _categoryService.GetByName(request.name);
            return categories;
        }
    }
}
