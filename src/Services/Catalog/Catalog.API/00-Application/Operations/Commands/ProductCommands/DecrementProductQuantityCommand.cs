using MediatR;

namespace Catalog.API._00_Application.Operations.Commands.ProductCommands;

public record DecrementProductQuantityCommand(Guid Id, int Quantity) : IRequest<bool>;
