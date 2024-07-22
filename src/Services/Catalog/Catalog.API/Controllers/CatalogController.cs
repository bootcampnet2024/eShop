using Catalog.API.Application.Extensions;
using Catalog.API.Application.Result;
using Catalog.API.Controllers.Core;
using Catalog.API.Controllers.Filters;
using Catalog.API.Services;
using Microsoft.AspNetCore.Mvc;
namespace Catalog.API.Controllers;

// GET catalog/items            -> Recupero todos os itens
// GET catalog/items/{id}       -> Recupero um item
// GET catalog/items?filter=""  -> Recepoero todos os itens que atendem ao filtro

[ApiController]
[Route("[controller]")]
public class CatalogController(ILogger<CatalogController> logger, ICatalogService service) : ControllerBase
{
    private readonly ILogger<CatalogController> _logger = logger;
    private readonly ICatalogService _service = service;

    [HttpGet]
    [Route("items")]
    public PaginatedItems<CatalogItemsResult> GetAll([FromQuery] CatalogItemsFilter filter)
    {
        filter ??= new CatalogItemsFilter() { PageIndex = 0, PageSize = 10, ShowOnlyHighlighted = true };

        var dataFilter = new CatalogItemFilter { ShowOnlyHighlighted = filter.ShowOnlyHighlighted, PageIndex = filter.PageIndex, PageSize = filter.PageSize };
        
        var data = _service.GetAll(dataFilter);

        return new PaginatedItems<CatalogItemsResult>() { Count = data.TotalItems, Items = data.Items.ToCatalogItemsResult(), PageIndex = filter.PageIndex, PageSize = filter.PageSize };
    }
}