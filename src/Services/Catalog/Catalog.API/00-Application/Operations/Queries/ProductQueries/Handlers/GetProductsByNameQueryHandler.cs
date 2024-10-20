using Catalog.API._01_Services;
using Catalog.API._01_Services.Models;
using MediatR;

namespace Catalog.API._00_Application.Operations.Queries.ProductQueries.Handlers
{
    public class GetProductsByNameQueryHandler(ICatalogItemService repository) : IRequestHandler<GetProductsByNameQuery, IEnumerable<CatalogItem>>
    {
        private readonly ICatalogItemService _productService = repository;
        public async Task<IEnumerable<CatalogItem>> Handle(GetProductsByNameQuery request, CancellationToken cancellationToken)
        {
            var products = await _productService.GetByName(request.name);
            return products;
        }
    }
}
