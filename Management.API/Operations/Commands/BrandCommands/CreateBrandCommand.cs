using Management.API.Models.Requests;
using MediatR;

namespace Management.API.Operations.Commands.BrandCommands
{
    public record CreateBrandCommand(CreateBrandRequest Brand) : IRequest<bool>;
}
