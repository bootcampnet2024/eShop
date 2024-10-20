using Catalog.API._00_Application.Operations.Queries.BrandQueries;
using Catalog.API._01_Services;
using Catalog.API._01_Services.DTOs;
using MediatR;

namespace Catalog.API.__00_Application.Operations.Queries.BrandQueries.Handlers
{
    public class GetAllBrandsQueryHandler(ICatalogBrandService brandService) : IRequestHandler<GetAllBrandsQuery, CatalogDataDTO<CatalogBrandDTO>>
    {
        private readonly ICatalogBrandService _brandService = brandService;
        public async Task<CatalogDataDTO<CatalogBrandDTO>> Handle(GetAllBrandsQuery request, CancellationToken cancellationToken)
        {
            return await _brandService.GetAll(request.Filter);
        }
    }
}
