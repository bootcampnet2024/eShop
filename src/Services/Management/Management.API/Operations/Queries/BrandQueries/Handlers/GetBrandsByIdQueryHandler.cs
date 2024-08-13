using Management.Domain.Models;
using Management.Domain.Repositories;
using MediatR;

namespace Management.API.Operations.Queries.BrandQueries.Handlers
{
    public class GetBrandsByIdQueryHandler(IBrandRepository brandRepository) : IRequestHandler<GetBrandsByIdQuery, Brand>
    {
        private readonly IBrandRepository _brandRepository = brandRepository;
        public async Task<Brand> Handle(GetBrandsByIdQuery request, CancellationToken cancellationToken)
        {
            var brand = await _brandRepository.GetById(request.id);
            return brand;
        }
    }
}
