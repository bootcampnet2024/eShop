using Catalog.API._01_Services;
using Catalog.API._01_Services.Models;
using MediatR;

namespace Catalog.API._00_Application.Operations.Queries.ProductQueries.Handlers
{
    public class GetProductsByIdQueryHandler(ICatalogItemService repository) : IRequestHandler<GetProductsByIdQuery, CatalogItem>
    {
        private readonly ICatalogItemService _productService = repository;
        public async Task<CatalogItem> Handle(GetProductsByIdQuery request, CancellationToken cancellationToken)
        {
            var product = await _productService.GetById(request.id);
            return product;
        }
    }
}
