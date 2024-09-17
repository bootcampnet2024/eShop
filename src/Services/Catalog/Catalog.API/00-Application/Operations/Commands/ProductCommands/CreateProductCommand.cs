using Catalog.API._00_Application.Models.Requests;
using MediatR;

namespace Catalog.API._00_Application_Operations.Commands.ProductCommands
{
    public record CreateProductCommand(CreateProductRequest Product) : IRequest<bool>;
}
