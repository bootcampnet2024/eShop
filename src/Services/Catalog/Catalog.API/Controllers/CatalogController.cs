using Catalog.API._00_Application.Result;
using Catalog.API.Application.Extensions;
using Catalog.API.Application.Result;
using Catalog.API.Controllers.Core;
using Catalog.API.Controllers.Filters;
using Catalog.API.Services;
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
    [Route("categories/{id:int}")]
    public CatalogCategoryResult GetCategory(int id)
    {
        var category = _service.GetCategoryById(id);

        if (category is null)
            return null;

        return category.ToCatalogCategoryResult();
    }

    [HttpGet]
    [Route("items")]
    public PaginatedItems<CatalogItemsResult> GetAllItems([FromQuery] CatalogItemsFilter filter = null)
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

        var data = _service.GetAllItems(dataFilter);

        return new PaginatedItems<CatalogItemsResult>()
        {
            ShowOnlyHighlighted = filter.ShowOnlyHighlighted,
            Count = data.TotalItems,
            Items = data.Items.ToCatalogItemsResult(),
            PageIndex = filter.PageIndex,
            PageSize = data.Items.Count(),
            Category = data.CategoryName
        };
    }
}