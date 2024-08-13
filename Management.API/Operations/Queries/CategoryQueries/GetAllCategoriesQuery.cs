using Management.Domain.Models;
using MediatR;

namespace Management.API.Operations.Queries.CategoryQueries
{
    public record GetAllCategoriesQuery : IRequest<IEnumerable<Category>>;
}
