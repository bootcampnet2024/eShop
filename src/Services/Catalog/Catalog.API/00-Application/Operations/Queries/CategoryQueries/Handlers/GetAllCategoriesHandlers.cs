using Catalog.API.Services;
using Catalog.API.Services.Models;
using MediatR;

namespace Catalog.API._00_Application.Operations.Queries.CategoryQueries.Handlers
{
    public class GetAllCategoriesHandlers(ICatalogCategoryService repository) : IRequestHandler<GetAllCategoriesQuery, IEnumerable<CatalogCategory>>
    {
        private readonly ICatalogCategoryService _categoryService = repository;
        public Task<IEnumerable<CatalogCategory>> Handle(GetAllCategoriesQuery request, CancellationToken cancellationToken)
        {
            return _categoryService.GetAll();
        }
    }
}
