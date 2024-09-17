using Catalog.API.Services;
using Catalog.API.Services.Models;
using MediatR;

namespace Catalog.API._00_Application.Operations.Commands.CategoryCommands.Handlers
{
    public class CreateCategoryCommandHandler(ICatalogCategoryService categoryService) : IRequestHandler<CreateCategoryCommand, bool>
    {
        private readonly ICatalogCategoryService _categoryService = categoryService;
        public async Task<bool> Handle(CreateCategoryCommand request, CancellationToken cancellationToken)
        {
            var brand = new CatalogCategory
            {
                Name = request.Category.Name
            };

            return await _categoryService.Add(brand);
        }
    }
}
