using Management.Domain.Models;
using MediatR;

namespace Management.API.Operations.Queries.ProductQueries
{
    public record GetProductsByIdQuery(Guid id) : IRequest<Product>;
}
