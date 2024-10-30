using Catalog.API._01_Services;
using Catalog.API._01_Services.Models;
using MediatR;

namespace Catalog.API._00_Application.Operations.Queries.BrandQueries.Handlers
{
    public class GetBrandsByNameQueryHandler(ICatalogBrandService brandService) : IRequestHandler<GetBrandsByNameQuery, IEnumerable<CatalogBrand>>
    {
        private readonly ICatalogBrandService _brandService = brandService;
        public async Task<IEnumerable<CatalogBrand>> Handle(GetBrandsByNameQuery request, CancellationToken cancellationToken)
        {
            var brands = await _brandService.GetByName(request.Name);
            return brands;
        }
    }
}
