using Catalog.API._00_Application.Models.Requests;
using Catalog.API._00_Application.Operations.Queries.ProductQueries;
using Catalog.API._00_Application_Operations.Commands.ProductCommands;
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
        public async Task<IActionResult> GetAll()
        {
            var query = new GetAllProductsQuery();
            var result = await _mediator.Send(query);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var command = new DeleteProductCommand(id);
            var result = await _mediator.Send(command);
            if (result) return Ok();
            return NotFound();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var query = new GetProductsByIdQuery(id);
            var result = await _mediator.Send(query);
            return Ok(result);
        }

        [HttpGet("name/{name}")]
        public async Task<IActionResult> SearchByName(string name)
        {
            var query = new GetProductsByNameQuery(name);
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
