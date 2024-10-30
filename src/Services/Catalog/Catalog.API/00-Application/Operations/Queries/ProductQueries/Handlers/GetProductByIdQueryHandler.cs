using Catalog.API._01_Services;
using Catalog.API._01_Services.Models;
using MediatR;

namespace Catalog.API._00_Application.Operations.Queries.ProductQueries.Handlers
{
    public class GetProductByIdQueryHandler(ICatalogItemService productService) : IRequestHandler<GetProductByIdQuery, CatalogItem>
    {
        private readonly ICatalogItemService _productService = productService;
        public async Task<CatalogItem> Handle(GetProductByIdQuery request, CancellationToken cancellationToken)
        {
            var product = await _productService.GetById(request.Id);
            return product;
        }
    }
}
