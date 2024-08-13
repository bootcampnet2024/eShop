using Management.API.Models.Requests;
using MediatR;

namespace Management.API.Operations.Commands.CategoryCommands
{
    public record UpdateCategoryCommand(int Id, UpdateCategoryRequest Category) : IRequest<bool>;
}
