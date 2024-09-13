using Catalog.API.Services.Models;
using MediatR;

namespace Catalog.API._00_Application.Operations.Queries.CategoryQueries
{
    public record GetCategoriesByIdQuery(int id) : IRequest<CatalogCategory>;
}
