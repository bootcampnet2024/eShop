using Catalog.API._01_Services;
using Catalog.API._01_Services.DTOs;
using MediatR;

namespace Catalog.API._00_Application.Operations.Queries.BrandQueries.Handlers
{
    public class GetBrandsByNameQueryHandler(ICatalogBrandService brandService) : IRequestHandler<GetBrandsByNameQuery, CatalogDataDTO<CatalogBrandDTO>>
    {
        private readonly ICatalogBrandService _brandService = brandService;
        public async Task<CatalogDataDTO<CatalogBrandDTO>> Handle(GetBrandsByNameQuery request, CancellationToken cancellationToken)
        {
            return await _brandService.GetByName(request.Name, request.Filter);
        }
    }
}
