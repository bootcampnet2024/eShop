using Catalog.API.Services;
using Catalog.API.Services.Models;
using MediatR;

namespace Catalog.API._00_Application.Operations.Queries.BrandQueries.Handlers
{
    public class GetBrandsByIdQueryHandler(ICatalogBrandService brandService) : IRequestHandler<GetBrandsByIdQuery, CatalogBrand>
    {
        private readonly ICatalogBrandService _brandService = brandService;
        public async Task<CatalogBrand> Handle(GetBrandsByIdQuery request, CancellationToken cancellationToken)
        {
            var brand = await _brandService.GetById(request.id);
            return brand;
        }
    }
}
