using Catalog.API._00_Application.Models.Requests;
using MediatR;

namespace Catalog.API._00_Application.Operations.Commands.CategoryCommands
{
    public record CreateCategoryCommand(CreateCategoryRequest Category) : IRequest<bool>;
}
