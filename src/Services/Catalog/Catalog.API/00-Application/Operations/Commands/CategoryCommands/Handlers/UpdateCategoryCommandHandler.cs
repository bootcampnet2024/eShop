using Catalog.API.Services;
using MediatR;

namespace Catalog.API._00_Application.Operations.Commands.CategoryCommands.Handlers
{
    public class UpdateCategoryCommandHandler(ICatalogCategoryService categoryService) : IRequestHandler<UpdateCategoryCommand, bool>
    {
        private readonly ICatalogCategoryService _categoryService = categoryService;

        public async Task<bool> Handle(UpdateCategoryCommand request, CancellationToken cancellationToken)
        {
            var category = await _categoryService.GetById(request.Id);

            if (category == null) return false;

            category.Name = request.Category.Name;

            return await _categoryService.Update(request.Id, category);
        }
    }
}
