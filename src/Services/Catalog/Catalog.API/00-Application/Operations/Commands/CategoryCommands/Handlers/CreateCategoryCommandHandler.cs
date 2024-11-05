using Catalog.API._01_Services;
using Catalog.API._01_Services.DTOs;
using MediatR;

namespace Catalog.API._00_Application.Operations.Commands.CategoryCommands.Handlers
{
    public class CreateCategoryCommandHandler(ICatalogCategoryService categoryService) : IRequestHandler<CreateCategoryCommand, bool>
    {
        private readonly ICatalogCategoryService _categoryService = categoryService;
        public async Task<bool> Handle(CreateCategoryCommand request, CancellationToken cancellationToken)
        {
            var createdAt = DateTime.UtcNow;

            var category = new CatalogCategoryDTO
            {
                Name = request.Category.Name,
                Description = request.Category.Description,
                ImageURL = request.Category.ImageURL,
                CreatedAt = createdAt,
                UpdatedAt = createdAt
            };

            return await _categoryService.Add(category);
        }
    }
}
