using Catalog.API._00_Application.Operations.Queries.BrandQueries;
using Catalog.API._01_Services;
using Catalog.API._01_Services.Models;
using MediatR;

namespace Catalog.API.__00_Application.Operations.Queries.BrandQueries.Handlers
{
    public class GetAllBrandsQueryHandler(ICatalogBrandService brandService) : IRequestHandler<GetAllBrandsQuery, CatalogBrandDataResult>
    {
        private readonly ICatalogBrandService _brandService = brandService;
        public async Task<CatalogBrandDataResult> Handle(GetAllBrandsQuery request, CancellationToken cancellationToken)
        {
            return await _brandService.GetAll(request.Filter);
        }
    }
}
