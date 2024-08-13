using Management.Domain.Models;
using MediatR;

namespace Management.API.Operations.Commands.ProductCommands
{
    public record UpdateProductCommand(Guid id, Product Product) : IRequest<bool>;
}
