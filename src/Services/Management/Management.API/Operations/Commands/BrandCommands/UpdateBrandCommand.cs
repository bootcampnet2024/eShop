using Management.API.Models.Requests;
using MediatR;

namespace Management.API.Operations.Commands.BrandCommands
{
    public record UpdateBrandCommand(int Id, UpdateBrandRequest Category) : IRequest<bool>;
}
