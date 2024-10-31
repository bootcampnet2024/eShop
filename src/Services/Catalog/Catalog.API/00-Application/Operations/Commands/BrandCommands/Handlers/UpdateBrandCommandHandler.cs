using Catalog.API._01_Services;
using MediatR;

namespace Catalog.API._00_Application.Operations.Commands.BrandCommands.Handlers
{
    public class UpdateBrandCommandHandler(ICatalogBrandService brandService) : IRequestHandler<UpdateBrandCommand, bool>
    {
        private readonly ICatalogBrandService _brandService = brandService;

        public async Task<bool> Handle(UpdateBrandCommand request, CancellationToken cancellationToken)
        {
            var brand = await _brandService.GetById(request.Id);

            if (brand == null) return false;

            brand.Name = request.Category.Name;

            return await _brandService.Update(request.Id, brand);
        }
    }
}
