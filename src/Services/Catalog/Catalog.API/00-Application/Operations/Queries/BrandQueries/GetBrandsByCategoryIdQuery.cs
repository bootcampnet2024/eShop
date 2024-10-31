using Catalog.API._01_Services.Models;
using MediatR;

namespace Catalog.API._00_Application.Operations.Queries.BrandQueries;

public record GetBrandsByCategoryIdQuery(int CategoryId) : IRequest<IEnumerable<CatalogBrand>>;