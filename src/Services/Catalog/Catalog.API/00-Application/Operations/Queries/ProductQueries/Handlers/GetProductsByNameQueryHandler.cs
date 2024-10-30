using Catalog.API._01_Services;
using Catalog.API._01_Services.Models;
using MediatR;

namespace Catalog.API._00_Application.Operations.Queries.ProductQueries.Handlers
{
    public class GetProductsByNameQueryHandler(ICatalogItemService productService) : IRequestHandler<GetProductsByNameQuery, IEnumerable<CatalogItem>>
    {
        private readonly ICatalogItemService _productService = productService;
        public async Task<IEnumerable<CatalogItem>> Handle(GetProductsByNameQuery request, CancellationToken cancellationToken)
        {
            var products = await _productService.GetByName(request.Name);
            return products;
        }
    }
}
