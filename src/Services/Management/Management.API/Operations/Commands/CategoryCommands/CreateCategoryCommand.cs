using Management.API.Models.Requests;
using MediatR;

namespace Management.API.Operations.Commands.CategoryCommands
{
    public record CreateCategoryCommand(CreateCategoryRequest Category) : IRequest<bool>;
}
