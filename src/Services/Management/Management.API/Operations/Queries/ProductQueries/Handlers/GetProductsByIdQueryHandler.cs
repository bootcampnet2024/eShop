using Management.Domain.Models;
using Management.Domain.Repositories;
using MediatR;

namespace Management.API.Operations.Queries.ProductQueries.Handlers
{
    public class GetProductsByIdQueryHandler(IProductRepository repository) : IRequestHandler<GetProductsByIdQuery, Product>
    {
        private readonly IProductRepository _productRepository = repository;
        public async Task<Product> Handle(GetProductsByIdQuery request, CancellationToken cancellationToken)
        {
            var product = await _productRepository.GetById(request.id);
            return product;
        }
    }
}
