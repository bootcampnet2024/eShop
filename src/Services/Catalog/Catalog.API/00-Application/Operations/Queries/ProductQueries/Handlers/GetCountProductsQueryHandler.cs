using Catalog.API._01_Services;
using MediatR;

namespace Catalog.API._00_Application.Operations.Queries.ProductQueries.Handlers
{
    public class GetCountProductsQueryHandler(ICatalogItemService productService) : IRequestHandler<GetCountProductsQuery, int>
    {
        private readonly ICatalogItemService _catalogItemService = productService;
        public async Task<int> Handle(GetCountProductsQuery request, CancellationToken cancellationToken)
        {
            var count = await _catalogItemService.GetCount(); 
            return count;
        }
    }
}
