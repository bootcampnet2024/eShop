using Catalog.API._01_Services;
using Catalog.API._01_Services.Models;
using MediatR;

namespace Catalog.API._00_Application.Operations.Queries.ProductQueries.Handlers
{
    public class GetAllProductsQueryHandler(ICatalogItemService repository) : IRequestHandler<GetAllProductsQuery, IEnumerable<CatalogItem>>
    {
        private readonly ICatalogItemService _productService = repository;
        public Task<IEnumerable<CatalogItem>> Handle(GetAllProductsQuery request, CancellationToken cancellationToken)
        {
            return _productService.GetAll();
        }
    }
}
