
using Catalog.API._01_Services;
using Catalog.API._01_Services.Models;
using MediatR;

namespace Catalog.API._00_Application.Operations.Queries.BrandQueries.Handlers;

public class GetBrandsByCategoryIdHandler(ICatalogBrandService brandService) : IRequestHandler<GetBrandsByCategoryIdQuery, IEnumerable<CatalogBrand>>
{
    private readonly ICatalogBrandService _brandService = brandService;

    public async Task<IEnumerable<CatalogBrand>> Handle(GetBrandsByCategoryIdQuery request, CancellationToken cancellationToken)
    {
        var brands = await _brandService.GetByCategoryId(request.CategoryId);
        return brands;
    }
}
