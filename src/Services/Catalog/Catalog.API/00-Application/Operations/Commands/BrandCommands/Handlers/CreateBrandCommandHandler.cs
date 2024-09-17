using Catalog.API.Services;
using Catalog.API.Services.Models;
using MediatR;

namespace Catalog.API._00_Application.Operations.Commands.BrandCommands.Handlers
{
    public class CreateBrandCommandHandler(ICatalogBrandService brandService) : IRequestHandler<CreateBrandCommand, bool>
    {
        private readonly ICatalogBrandService _brandService = brandService;
        public async Task<bool> Handle(CreateBrandCommand request, CancellationToken cancellationToken)
        {
            var brand = new CatalogBrand
            {
                Name = request.Brand.Name
            };

            return await _brandService.Add(brand);
        }
    }
}
