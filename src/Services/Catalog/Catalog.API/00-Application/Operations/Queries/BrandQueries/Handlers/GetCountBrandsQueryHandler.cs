using Catalog.API._01_Services;
using MediatR;

namespace Catalog.API._00_Application.Operations.Queries.BrandQueries.Handlers
{
    public class GetCountBrandsQueryHandler(ICatalogBrandService brandService) : IRequestHandler<GetCountBrandsQuery, int>
    {
        private readonly ICatalogBrandService _brandService = brandService;
        public async Task<int> Handle(GetCountBrandsQuery request, CancellationToken cancellationToken)
        {
            var count = await _brandService.GetCount();
            return count;
        }
    }
}
