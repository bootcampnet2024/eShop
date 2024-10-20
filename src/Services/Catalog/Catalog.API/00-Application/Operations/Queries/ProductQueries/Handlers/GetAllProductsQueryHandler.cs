using Catalog.API._01_Services;
using Catalog.API._01_Services.DTOs;
using MediatR;

namespace Catalog.API._00_Application.Operations.Queries.ProductQueries.Handlers
{
    public class GetAllProductsQueryHandler(ICatalogItemService productService) : IRequestHandler<GetAllProductsQuery, CatalogDataDTO<CatalogItemDTO>>
    {
        private readonly ICatalogItemService _productService = productService;
        public async Task<CatalogDataDTO<CatalogItemDTO>> Handle(GetAllProductsQuery request, CancellationToken cancellationToken)
        {
            return await _productService.GetAll(request.Filter);
        }
    }
}
