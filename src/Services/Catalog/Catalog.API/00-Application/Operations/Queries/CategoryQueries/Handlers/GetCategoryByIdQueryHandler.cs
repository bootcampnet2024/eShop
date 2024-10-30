using Catalog.API._01_Services;
using Catalog.API._01_Services.Models;
using MediatR;

namespace Catalog.API._00_Application.Operations.Queries.CategoryQueries.Handlers
{
    public class GetCategoryByIdQueryHandler(ICatalogCategoryService categoryService) : IRequestHandler<GetCategoryByIdQuery, CatalogCategory>
    {
        private readonly ICatalogCategoryService _categoryService = categoryService;
        public async Task<CatalogCategory> Handle(GetCategoryByIdQuery request, CancellationToken cancellationToken)
        {
            var category = await _categoryService.GetById(request.Id);
            return category;
        }
    }
}
