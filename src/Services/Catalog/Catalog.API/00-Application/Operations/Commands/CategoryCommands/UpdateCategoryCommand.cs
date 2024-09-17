using Catalog.API._00_Application.Models.Requests;
using MediatR;

namespace Catalog.API._00_Application.Operations.Commands.CategoryCommands
{
    public record UpdateCategoryCommand(int Id, UpdateCategoryRequest Category) : IRequest<bool>;
}
