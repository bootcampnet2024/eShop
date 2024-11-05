using Catalog.API._01_Services;
using Catalog.API._01_Services.DTOs;
using MediatR;

namespace Catalog.API._00_Application.Operations.Commands.BrandCommands.Handlers
{
    public class CreateBrandCommandHandler(ICatalogBrandService brandService) : IRequestHandler<CreateBrandCommand, bool>
    {
        private readonly ICatalogBrandService _brandService = brandService;
        public async Task<bool> Handle(CreateBrandCommand request, CancellationToken cancellationToken)
        {
            var createdAt = DateTime.UtcNow;

            var brand = new CatalogBrandDTO
            {
                Name = request.Brand.Name,
                ImageURL = request.Brand.ImageURL,
                CreatedAt = createdAt,
                UpdatedAt = createdAt
            };

            return await _brandService.Add(brand);
        }
    }
}
