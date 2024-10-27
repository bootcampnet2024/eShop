using Catalog.API._00_Application.Operations.Queries.BrandQueries;
using Catalog.API.Services;
using Catalog.API.Services.Models;
using MediatR;

namespace Catalog.API.__00_Application.Operations.Queries.BrandQueries.Handlers;

public class GetAllBrandsQueryHandler(ICatalogBrandService service) : IRequestHandler<GetAllBrandsQuery, IEnumerable<CatalogBrand>>
{
    private readonly ICatalogBrandService _brandService = service;
    public Task<IEnumerable<CatalogBrand>> Handle(GetAllBrandsQuery request, CancellationToken cancellationToken)
    {
        return _brandService.GetAll();
    }
}
