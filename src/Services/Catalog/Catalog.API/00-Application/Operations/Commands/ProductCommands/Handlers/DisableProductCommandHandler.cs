using Catalog.API._00_Application_Operations.Commands.ProductCommands;
using Catalog.API._01_Services;
using MediatR;

namespace Catalog.API._00_Application.Operations.Commands.ProductCommands.Handlers
{
    public class DisableProductCommandHandler(ICatalogItemService repository) : IRequestHandler<DisableProductCommand, bool>
    {
        private readonly ICatalogItemService _productService = repository;
        public async Task<bool> Handle(DisableProductCommand request, CancellationToken cancellation)
        {
            return await _productService.Disable(request.id);
        }
    }
}
