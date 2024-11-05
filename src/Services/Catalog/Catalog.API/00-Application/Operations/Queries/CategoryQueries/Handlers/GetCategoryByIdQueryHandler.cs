using Catalog.API._01_Services;
using Catalog.API._01_Services.DTOs;
using MediatR;

namespace Catalog.API._00_Application.Operations.Queries.CategoryQueries.Handlers
{
    public class GetCategoryByIdQueryHandler(ICatalogCategoryService categoryService) : IRequestHandler<GetCategoryByIdQuery, CatalogCategoryDTO>
    {
        private readonly ICatalogCategoryService _categoryService = categoryService;
        public async Task<CatalogCategoryDTO> Handle(GetCategoryByIdQuery request, CancellationToken cancellationToken)
        {
            return await _categoryService.GetById(request.Id);
        }
    }
}
