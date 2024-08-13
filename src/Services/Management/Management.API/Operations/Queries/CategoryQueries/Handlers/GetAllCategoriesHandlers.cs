using Management.API.Operations.Queries.BrandQueries;
using Management.Domain.Models;
using Management.Domain.Repositories;
using MediatR;

namespace Management.API.Operations.Queries.CategoryQueries.Handlers
{
    public class GetAllCategoriesHandlers(ICategoryRepository repository) : IRequestHandler<GetAllCategoriesQuery, IEnumerable<Category>>
    {
        private readonly ICategoryRepository _categoryRepository = repository;
        public Task<IEnumerable<Category>> Handle(GetAllCategoriesQuery request, CancellationToken cancellationToken)
        {
            return _categoryRepository.GetAll();
        }
    }
}
