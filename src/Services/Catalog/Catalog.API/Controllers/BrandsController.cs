using Catalog.API._00_Application.Models.Requests;
using Catalog.API._00_Application.Operations.Commands.BrandCommands;
using Catalog.API._00_Application.Operations.Queries.BrandQueries;
using Catalog.API.Controllers.Filters;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Catalog.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BrandsController(IMediator mediator) : ControllerBase
    {
        private readonly IMediator _mediator = mediator;

        [HttpPost]
        public async Task<IActionResult> Add(CreateBrandRequest request)
        {
            var command = new CreateBrandCommand(request);

            var result = await _mediator.Send(command);

            if (result) return Ok("Brand created successfully");

            return BadRequest("Failed to create brand");
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] GenericFilter filter)
        {
            var query = new GetAllBrandsQuery(filter);
            var result = await _mediator.Send(query);
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var query = new GetBrandByIdQuery(id);
            var result = await _mediator.Send(query);
            return Ok(result);
        }

        [HttpGet("name/{name}")]
        public async Task<IActionResult> GetByName(string name)
        {
            var query = new GetBrandsByNameQuery(name);
            var result = await _mediator.Send(query);
            return Ok(result);
        }

        [HttpGet("count/")]
        public async Task<IActionResult> GetCount()
        {
            var query = new GetCountBrandsQuery();
            var result = await _mediator.Send(query);
            return Ok(result);
        }

        [HttpGet("categoryId/{id:int}")]
        public async Task<IActionResult> GetByCategoryId(int id)
        {
            var query = new GetBrandsByCategoryIdQuery(id);
            var result = await _mediator.Send(query);

            if (!result.Any())
                return NoContent();

            return Ok(result);
        }

        [HttpPut]
        public async Task<IActionResult> Update(int id, UpdateBrandRequest request)
        {
            var command = new UpdateBrandCommand(id, request);

            var result = await _mediator.Send(command);

            if (result) return Ok("Brand updated successfully");

            return BadRequest("Failed to update brand");
        }
    }
}
