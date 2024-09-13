using Catalog.API._00_Application.Models.Requests;
using MediatR;

namespace Catalog.API._00_Application.Operations.Commands.BrandCommands
{
    public record CreateBrandCommand(CreateBrandRequest Brand) : IRequest<bool>;
}
