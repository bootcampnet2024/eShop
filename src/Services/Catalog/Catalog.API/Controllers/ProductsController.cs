using Catalog.API._00_Application.Models.Requests;
using Catalog.API._00_Application.Operations.Queries.ProductQueries;
using Catalog.API._00_Application.Result;
using Catalog.API._00_Application_Operations.Commands.ProductCommands;
using Catalog.API.Controllers.Filters;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Catalog.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductsController(IMediator mediator) : ControllerBase
    {
        private readonly IMediator _mediator = mediator;

        [HttpPost]
        public async Task<IActionResult> Add(CreateProductRequest request)
        {
            var command = new CreateProductCommand(request);

            var result = await _mediator.Send(command);

            if (result) return Ok("Product created.");

            return BadRequest("Failed to create product.");
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] CatalogItemsFilter filter)
        {
            var query = new GetAllProductsQuery(filter);
            var result = await _mediator.Send(query);

            return Ok(new CatalogDataResult<CatalogItemResult> { Items = result.Items.Select(CatalogItemResult.FromDTO), TotalItems = result.TotalItems });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Disable(Guid id)
        {
            var command = new DisableProductCommand(id);
            var result = await _mediator.Send(command);
            if (result) return Ok();
            return NotFound();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var query = new GetProductByIdQuery(id);
            var result = await _mediator.Send(query);

            return Ok(CatalogItemResult.FromDTO(result));
        }

        [HttpGet("name/{name}")]
        public async Task<IActionResult> GetByName(string name, [FromQuery] CatalogItemsFilter filter)
        {
            var query = new GetProductsByNameQuery(name, filter);
            var result = await _mediator.Send(query);

            return Ok(new CatalogDataResult<CatalogItemResult> { Items = result.Items.Select(CatalogItemResult.FromDTO), TotalItems = result.TotalItems });
        }

        [HttpGet("count/")]
        public async Task<IActionResult> GetCount()
        {
            var query = new GetCountProductsQuery();
            var result = await _mediator.Send(query);
            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, UpdateProductRequest request)
        {
            var command = new UpdateProductCommand(id, request);

            var result = await _mediator.Send(command);

            if (result) return Ok("Product updated successfully");

            return BadRequest("Failed to update product");
        }
    }
}
