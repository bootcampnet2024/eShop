using Catalog.API._01_Services;
using MediatR;

namespace Catalog.API._00_Application.Operations.Commands.ProductCommands.Handlers;

public class DecrementProductQuantityCommandHandler(ICatalogItemService productService) : IRequestHandler<DecrementProductQuantityCommand, bool>
{
    private readonly ICatalogItemService _productService = productService;
    public async Task<bool> Handle(DecrementProductQuantityCommand request, CancellationToken cancellationToken)
    {
        var product = await _productService.GetById(request.Id);

        return await _productService.UpdateQuantity(request.Id, product.Quantity - request.Quantity);
    }
}
