using Catalog.API.Application.Extensions;
using Catalog.API.Application.Result;
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
    public IEnumerable<CatalogItemsResult> GetAll()
    {
        return _service.GetAll().ToCatalogItemsResult(); 
    }
}