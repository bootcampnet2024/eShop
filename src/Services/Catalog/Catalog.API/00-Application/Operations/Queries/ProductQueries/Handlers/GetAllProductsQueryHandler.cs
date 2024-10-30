using Catalog.API._01_Services;
using Catalog.API._01_Services.Models;
using MediatR;

namespace Catalog.API._00_Application.Operations.Queries.ProductQueries.Handlers
{
    public class GetAllProductsQueryHandler(ICatalogItemService productService) : IRequestHandler<GetAllProductsQuery, CatalogItemDataResult>
    {
        private readonly ICatalogItemService _productService = productService;
        public async Task<CatalogItemDataResult> Handle(GetAllProductsQuery request, CancellationToken cancellationToken)
        {
            return await _productService.GetAll(request.Filter);
        }
    }
}
