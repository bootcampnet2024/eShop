using Management.Domain.Models;
using Management.Domain.Repositories;
using MediatR;

namespace Management.API.Operations.Queries.ProductQueries.Handlers
{
    public class GetProductsByNameQueryHandler(IProductRepository repository) : IRequestHandler<GetProductsByNameQuery, IEnumerable<Product>>
    {
        private readonly IProductRepository _productRepository = repository;
        public async Task<IEnumerable<Product>> Handle(GetProductsByNameQuery request, CancellationToken cancellationToken)
        {
            var products = await _productRepository.GetByName(request.name);
            return products;
        }
    }
}
