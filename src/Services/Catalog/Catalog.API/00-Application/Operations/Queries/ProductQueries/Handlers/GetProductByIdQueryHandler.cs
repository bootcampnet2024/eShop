using Catalog.API._01_Services;
using Catalog.API._01_Services.DTOs;
using MediatR;

namespace Catalog.API._00_Application.Operations.Queries.ProductQueries.Handlers
{
    public class GetProductByIdQueryHandler(ICatalogItemService productService) : IRequestHandler<GetProductByIdQuery, CatalogItemDTO>
    {
        private readonly ICatalogItemService _productService = productService;
        public async Task<CatalogItemDTO> Handle(GetProductByIdQuery request, CancellationToken cancellationToken)
        {
            return await _productService.GetById(request.Id);
        }
    }
}
