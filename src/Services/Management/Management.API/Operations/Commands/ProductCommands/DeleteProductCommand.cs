using Management.Domain.Repositories;
using MediatR;

namespace Management.API.Operations.Commands.ProductCommands
{
    public record DeleteProductCommand(Guid id) : IRequest<bool>;
}
