using Management.Domain.Models;
using Management.Domain.Repositories;
using MediatR;

namespace Management.API.Operations.Queries.CategoryQueries.Handlers
{
    public class GetCategoriesByIdQueryHandler(ICategoryRepository categoryRepository) : IRequestHandler<GetCategoriesByIdQuery, Category>
    {
        private readonly ICategoryRepository _categoryRepository = categoryRepository;
        public async Task<Category> Handle(GetCategoriesByIdQuery request, CancellationToken cancellationToken)
        {
            var category = await _categoryRepository.GetById(request.id);
            return category;
        }
    }
}
