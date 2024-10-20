using Catalog.API._00_Application.Result;
using Catalog.API._00_Application.Extensions;
using Catalog.API._00_Application.Result;
using Catalog.API.Controllers.Core;
using Catalog.API.Controllers.Filters;
using Catalog.API._01_Services;
using Microsoft.AspNetCore.Mvc;

namespace Catalog.API.Controllers;

// GET catalog/categories       -> Recupero a lista de categorias.
// GET catalog/categories/{id}  -> Recupero uma categoria.
// GET catalog/items            -> Recupero todos os itens.
// GET catalog/items/{id}       -> Recupero um item.
// GET catalog/items?filter=""  -> Recupero todos os itens que atendem ao filtro.
[ApiController]
[Route("[controller]")]
public class CatalogController(ILogger<CatalogController> logger, ICatalogService service) : ControllerBase
{
    private readonly ILogger<CatalogController> _logger = logger;
    private readonly ICatalogService _service = service;

    [HttpGet]
    [Route("categories")]
    public IEnumerable<CatalogCategoryResult> GetAllCategories()
    {
        return _service.GetAllCategories().ToCatalogCategoryResult();
    }

    [HttpGet]
    [Route("items")]
    public PaginatedItems<CatalogItemsResult> GetAll([FromQuery] CatalogItemsFilter filter = null)
    {
        filter ??= new CatalogItemsFilter();

        if (filter.PageIndex < 0)
            filter.PageIndex = 0;

        var dataFilter = new CatalogItemFilter
        {
            ShowOnlyHighlighted = filter.ShowOnlyHighlighted,
            PageIndex = filter.PageIndex,
            PageSize = filter.PageSize,
            CategoryId = filter.CategoryId
        };

        var data = _service.GetAll(dataFilter);

        return new PaginatedItems<CatalogItemsResult>()
        {
            Count = data.TotalItems,
            Items = data.Items.ToCatalogItemsResult(),
            PageIndex = filter.PageIndex,
            PageSize = data.Items.Count(),
        };
    }

    [HttpGet]
    [Route("search")]
    public async Task<ActionResult> SearchProduct(string keyword)
    {
        if (string.IsNullOrWhiteSpace(keyword))
        {
            return BadRequest("Keyword cannot be null or empty.");
        }
        var product = await _service.SearchProduct(keyword.ToLower());
        if (product == null) NotFound("Product not found.");
        return Ok(product);
    }
}