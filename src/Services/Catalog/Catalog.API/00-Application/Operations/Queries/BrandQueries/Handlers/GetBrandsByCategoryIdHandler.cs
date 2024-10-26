using Catalog.API._01_Services;
using Catalog.API._01_Services.DTOs;
using MediatR;

namespace Catalog.API._00_Application.Operations.Queries.BrandQueries.Handlers;

public class GetBrandsByCategoryIdHandler(ICatalogBrandService brandService) : IRequestHandler<GetBrandsByCategoryIdQuery, IEnumerable<CatalogBrandDTO>>
{
    private readonly ICatalogBrandService _brandService = brandService;

    public async Task<IEnumerable<CatalogBrandDTO>> Handle(GetBrandsByCategoryIdQuery request, CancellationToken cancellationToken)
    {
        var brands = await _brandService.GetByCategoryId(request.CategoryId);
        return brands;
    }
}
