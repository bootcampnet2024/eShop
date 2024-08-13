using Management.API.Models.Requests;
using Management.Domain.Models;
using MediatR;

namespace Management.API.Operations.Commands.ProductCommands
{
    public record UpdateProductCommand(Guid Id, UpdateProductRequest Product) : IRequest<bool>;
}
