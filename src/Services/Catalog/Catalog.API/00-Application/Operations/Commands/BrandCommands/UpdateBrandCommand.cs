using Catalog.API._00_Application.Models.Requests;
using MediatR;

namespace Catalog.API._00_Application.Operations.Commands.BrandCommands
{
    public record UpdateBrandCommand(int Id, UpdateBrandRequest Category) : IRequest<bool>;
}
