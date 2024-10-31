using Catalog.API._01_Services;
using Catalog.API._01_Services.Models;
using MediatR;

namespace Catalog.API._00_Application.Operations.Queries.BrandQueries.Handlers
{
    public class GetBrandByIdQueryHandler(ICatalogBrandService brandService) : IRequestHandler<GetBrandByIdQuery, CatalogBrand>
    {
        private readonly ICatalogBrandService _brandService = brandService;
        public async Task<CatalogBrand> Handle(GetBrandByIdQuery request, CancellationToken cancellationToken)
        {
            var brand = await _brandService.GetById(request.Id);
            return brand;
        }
    }
}
