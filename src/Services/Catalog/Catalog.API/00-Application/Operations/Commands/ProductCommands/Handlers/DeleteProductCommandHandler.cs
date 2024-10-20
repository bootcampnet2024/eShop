using Catalog.API._00_Application_Operations.Commands.ProductCommands;
using Catalog.API._01_Services;
using MediatR;

namespace Catalog.API._00_Application.Operations.Commands.ProductCommands.Handlers
{
    public class DeleteProductCommandHandler(ICatalogItemService repository) : IRequestHandler<DeleteProductCommand, bool>
    {
        private readonly ICatalogItemService _productService = repository;
        public async Task<bool> Handle(DeleteProductCommand request, CancellationToken cancellation)
        {
            return await _productService.Delete(request.id);
        }
    }
}
