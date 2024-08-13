using Management.Domain.Models;
using MediatR;

namespace Management.API.Operations.Queries.ProductQueries
{
    public record GetAllProductsQuery : IRequest<IEnumerable<Product>>;
}
