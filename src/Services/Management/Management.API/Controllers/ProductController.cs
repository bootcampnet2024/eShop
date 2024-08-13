using Management.API.Models.Requests;
using Management.API.Operations.Commands.ProductCommands;
using Management.API.Operations.Queries.ProductQueries;
using Management.Domain.Models;
using Management.Domain.Repositories;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Management.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductController(IMediator mediator, IProductRepository repository) : ControllerBase
    {
        private readonly IMediator _mediator = mediator;

        [HttpPost]
        public async Task<IActionResult> Add(CreateProductRequest request)
        {
            var command = new CreateProductCommand(request);

            var result = await _mediator.Send(command);

            if (result) return Ok("Product created successfully");

            return BadRequest("Failed to create product");
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
            if(result) return Ok();
            return NotFound();
        }

        [HttpGet("name/{name}")]
        public async Task<IActionResult> SearchByName(string name)
        {
            var query = new GetProductsByNameQuery(name);
            var result = await _mediator.Send(query);
            return Ok(result);
        }

        [HttpPut]
        public async Task<IActionResult> Update(Guid id, UpdateProductRequest request)
        {
            var command = new UpdateProductCommand(id, request);

            var result = await _mediator.Send(command);

            if (result) return Ok("Product updated successfully");

            return BadRequest("Failed to update product");
        }
    }
}
