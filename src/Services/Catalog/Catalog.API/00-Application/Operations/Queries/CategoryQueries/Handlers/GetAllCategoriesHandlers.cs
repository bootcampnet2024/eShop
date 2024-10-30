using Catalog.API._01_Services;
using Catalog.API._01_Services.Models;
using MediatR;

namespace Catalog.API._00_Application.Operations.Queries.CategoryQueries.Handlers
{
    public class GetAllCategoriesHandlers(ICatalogCategoryService categoryService) : IRequestHandler<GetAllCategoriesQuery, IEnumerable<CatalogCategory>>
    {
        private readonly ICatalogCategoryService _categoryService = categoryService;
        public Task<IEnumerable<CatalogCategory>> Handle(GetAllCategoriesQuery request, CancellationToken cancellationToken)
        {
            return _categoryService.GetAll();
        }
    }
}
