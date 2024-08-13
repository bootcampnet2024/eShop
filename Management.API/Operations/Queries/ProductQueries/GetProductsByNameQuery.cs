using Management.Domain.Models;
using MediatR;

namespace Management.API.Operations.Queries.ProductQueries
{
    public record GetProductsByNameQuery(string name) : IRequest<IEnumerable<Product>>;
}
