using Catalog.API._01_Services.DTOs;
using MediatR;

namespace Catalog.API._00_Application.Operations.Queries.ProductQueries
{
    public record GetProductByIdQuery(Guid Id) : IRequest<CatalogItemDTO>;
}
