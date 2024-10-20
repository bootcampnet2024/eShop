using Catalog.API._01_Services;
using Catalog.API._01_Services.DTOs;
using MediatR;

namespace Catalog.API._00_Application.Operations.Queries.ProductQueries.Handlers
{
    public class GetProductsByNameQueryHandler(ICatalogItemService productService) : IRequestHandler<GetProductsByNameQuery, CatalogDataDTO<CatalogItemDTO>>
    {
        private readonly ICatalogItemService _productService = productService;
        public async Task<CatalogDataDTO<CatalogItemDTO>> Handle(GetProductsByNameQuery request, CancellationToken cancellationToken)
        {
            return await _productService.GetByName(request.Name, request.Filter);
        }
    }
}
