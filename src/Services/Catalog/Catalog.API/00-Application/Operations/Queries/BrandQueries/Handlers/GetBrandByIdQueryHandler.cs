using Catalog.API._01_Services;
using Catalog.API._01_Services.DTOs;
using MediatR;

namespace Catalog.API._00_Application.Operations.Queries.BrandQueries.Handlers
{
    public class GetBrandByIdQueryHandler(ICatalogBrandService brandService) : IRequestHandler<GetBrandByIdQuery, CatalogBrandDTO>
    {
        private readonly ICatalogBrandService _brandService = brandService;
        public async Task<CatalogBrandDTO> Handle(GetBrandByIdQuery request, CancellationToken cancellationToken)
        {
            return await _brandService.GetById(request.Id);
        }
    }
}
