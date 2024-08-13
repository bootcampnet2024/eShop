using Management.Domain.Models;
using MediatR;

namespace Management.API.Operations.Queries.CategoryQueries
{
    public record GetCategoriesByIdQuery(int id) : IRequest<Category>;
}
