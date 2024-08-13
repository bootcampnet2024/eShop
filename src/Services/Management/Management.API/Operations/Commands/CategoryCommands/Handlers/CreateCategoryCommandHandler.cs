using Management.API.Operations.Commands.BrandCommands;
using Management.Domain.Models;
using Management.Domain.Repositories;
using MediatR;

namespace Management.API.Operations.Commands.CategoryCommands.Handlers
{
    public class CreateCategoryCommandHandler(ICategoryRepository categoryRepository) : IRequestHandler<CreateCategoryCommand, bool>
    {
        private readonly ICategoryRepository _categoryRepository = categoryRepository;
        public async Task<bool> Handle(CreateCategoryCommand request, CancellationToken cancellationToken)
        {
            var brand = new Category
            {
                Name = request.Category.Name
            };

            return await _categoryRepository.Add(brand);
        }
    }
}
