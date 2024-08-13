using Management.API.Models.Requests;
using Management.Domain.Repositories;
using MediatR;

namespace Management.API.Operations.Commands.CategoryCommands.Handlers
{
    public class UpdateCategoryCommandHandler(ICategoryRepository categoryRepository) : IRequestHandler<UpdateCategoryCommand, bool>
    {
        private readonly ICategoryRepository _categoryRepository = categoryRepository;

        public async Task<bool> Handle(UpdateCategoryCommand request, CancellationToken cancellationToken)
        {
            var category = await _categoryRepository.GetById(request.Id);

            if (category == null) return false;

            category.Name = request.Category.Name;

            return await _categoryRepository.Update(request.Id, category);
        }
    }
}
