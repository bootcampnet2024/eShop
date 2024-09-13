using MediatR;

namespace Catalog.API._00_Application_Operations.Commands.ProductCommands
{
    public record DeleteProductCommand(Guid id) : IRequest<bool>;
}
