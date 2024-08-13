using Management.Domain.Models;
using Management.Domain.Repositories;
using MediatR;

namespace Management.API.Operations.Queries.BrandQueries.Handlers
{
    public class GetAllProductsQueryHandler(IBrandRepository repository) : IRequestHandler<GetAllBrandsQuery, IEnumerable<Brand>>
    {
        private readonly IBrandRepository _brandRepository = repository;
        public Task<IEnumerable<Brand>> Handle(GetAllBrandsQuery request, CancellationToken cancellationToken)
        {
            return _brandRepository.GetAll();
        }
    }
}
